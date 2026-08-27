import jetpack from 'fs-jetpack';
import { debuglog } from 'util';
import { asyncArrayFilter } from '../helper/asyncFilter';
import { debugLog, log } from '../helper/log';
import commitChangesToGit from '../jobs/commitChangesToGit';
import runCiJobs from '../runCiJobs';
import isDirectoryFlarumExtension from './isDirectoryFlarumExtension';
import mapWithConcurrency from '../helper/mapWithConcurrency';
import * as core from '@actions/core';

/**
 * Reads a numeric action input, falling back to `fallback` when it is unset or
 * not a positive number.
 */
function numericInput(name: string, fallback: number): number {
  const parsed = Number.parseInt(core.getInput(name), 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

interface IPackageInfo {
  name: string;
  gitRemote: string;
  mainBranch: string;
}

interface MonorepoJsonContent {
  packages: {
    extensions?: IPackageInfo[];
    composer?: IPackageInfo[];
    npm?: IPackageInfo[];
    core?: IPackageInfo;
  };
}

/**
 * Detects if there is a `flarum-monorepo.json` file in the repository root.
 *
 * If so, it will iterate over the extensions defined in the file, if present,
 * and run the appropriate CI jobs for each asynchronously.
 *
 * Returns `true` if the repo has a `flarum-monorepo.json` file and this file
 * has handled JS actions, `false` otherwise.
 */
export async function handleFlarumMonorepo(): Promise<boolean> {
  debugLog('** Checking for Flarum monorepo...');

  const monorepoJson: MonorepoJsonContent | undefined = await jetpack.readAsync('flarum-monorepo.json', 'json');

  // `undefined` means the file was not found
  if (monorepoJson === undefined) {
    debugLog(`** flarum-monorepo.json not found!`);
    return false;
  }

  const repositories =
    monorepoJson.packages.extensions?.map((extension) => ({
      ...extension,
      pathToDir: `./extensions/${extension.name}`,
    })) ?? [];

  // Special case for core
  if (monorepoJson.packages.core) {
    debugLog(`** Handling special case for flarum-core...`);
    repositories.push({
      ...monorepoJson.packages.core,
      pathToDir: './framework/core',
    });
  }

  if (repositories.length === 0) return false;
  debugLog(`** Packages found in monorepo!`);

  const filteredRepositories = await asyncArrayFilter(repositories, async (repository) => await isDirectoryFlarumExtension(repository.pathToDir));

  if (filteredRepositories.length === 0) return false;
  debugLog(`** Determined >=1 package is a valid Flarum extension!`);

  log(`-- Flarum monorepo detected!`);
  log(`-- Running CI for ${filteredRepositories.length} package(s)`);

  debugLog(`** Running CI for:`);
  filteredRepositories.forEach((r) => {
    debuglog(`**  - ${r.name} (${r.pathToDir})`);
  });

  const buildConcurrency = numericInput('max_parallel_packages', 4);
  const testConcurrency = numericInput('max_parallel_test_packages', 2);

  // Every package's tsconfig resolves `flarum/*` and `ext:flarum/*` to other
  // packages' `dist-typings`, and a typings build usually clears its own output
  // directory first. Packages therefore cannot emit typings at the same time as
  // their siblings typecheck against them, so a package whose typings build
  // failed is retried once the whole set has been emitted.
  await core.group('Typings', async () => {
    const results = await mapWithConcurrency(filteredRepositories, buildConcurrency, (repository) =>
      runCiJobs(repository.pathToDir, {
        preBuildChecks: false,
        buildBundle: false,
        postBuildChecks: false,
        commit: false,
        quietTypings: true,
        packageName: repository.name,
      })
    );

    const retries = filteredRepositories.filter((_repository, index) => !results[index].typingsOk);

    if (retries.length === 0) return;

    log(`-- Retrying typings for ${retries.length} package(s) now the full set has been emitted`);

    for (const repository of retries) {
      await runCiJobs(repository.pathToDir, {
        prepare: false,
        preBuildChecks: false,
        buildBundle: false,
        postBuildChecks: false,
        commit: false,
        packageName: repository.name,
      });
    }
  });

  // Then the pre-build checks and the bundle builds.
  await core.group('Pre-build scripts', async () => {
    await mapWithConcurrency(filteredRepositories, buildConcurrency, (repository) =>
      runCiJobs(repository.pathToDir, {
        prepare: false,
        buildTypings: false,
        postBuildChecks: false,
        commit: false,
        packageName: repository.name,
      })
    );
  });

  // Then, run the post-build scripts. Each package's test script starts its own
  // worker pool, so these run at a lower concurrency than the builds to keep the
  // runner from being killed for exhausting memory.
  await core.group('Post-build scripts', async () => {
    await mapWithConcurrency(filteredRepositories, testConcurrency, (repository) =>
      runCiJobs(repository.pathToDir, {
        prepare: false,
        preBuildChecks: false,
        build: false,
        commit: false,
        packageName: repository.name,
      })
    );
  });

  // Finally, if all went well, commit the changes to the main branch.
  await core.group('Commit changes', async () => {
    await commitChangesToGit(jetpack.cwd('./'));
  });

  return true;
}
