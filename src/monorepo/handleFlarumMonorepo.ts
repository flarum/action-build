import jetpack from 'fs-jetpack';
import { debuglog } from 'util';
import { asyncArrayFilter } from '../helper/asyncFilter';
import { debugLog, log } from '../helper/log';
import commitChangesToGit from '../jobs/commitChangesToGit';
import runCiJobs from '../runCiJobs';
import isDirectoryFlarumExtension from './isDirectoryFlarumExtension';
import * as core from '@actions/core';

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

interface IPackageInfoWithPath extends IPackageInfo {
  pathToDir: string;
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

  // Run the CI jobs for each repository in parallel and wait for completion

  // First, run the pre-build & build scripts.
  await core.group('Pre-build scripts', async () => {
    await Promise.all(
      filteredRepositories.map((repository) =>
        runCiJobs(
          repository.pathToDir,
          {
            postBuildChecks: false,
            commit: false,
            packageName: repository.name
          }
        )
      )
    );
  });

  // Then, run the post-build scripts.
  await core.group('Post-build scripts', async () => {
    await Promise.all(
      filteredRepositories.map((repository) =>
        runCiJobs(
          repository.pathToDir,
          {
            prepare: false,
            preBuildChecks: false,
            build: false,
            commit: false,
            packageName: repository.name
          }
        )
      )
    );
  });

  // Finally, if all went well, commit the changes to the main branch.
  await core.group('Commit changes', async () => {
    await commitChangesToGit(jetpack.cwd('./'));
  });

  return true;
}
