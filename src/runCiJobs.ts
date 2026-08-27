import jetpack from 'fs-jetpack';
import { debugLog, log } from './helper/log';

import JSPackageManagerInterop from './helper/JSPackageManagerInterop';
import installJsDependencies from './jobs/installJsDependencies';
import runBuildScript from './jobs/runBuildScript';
import runBuildTypingsScript from './jobs/runBuildTypingsScript';
import runFormatCheckScript from './jobs/runFormatCheckScript';
import commitChangesToGit from './jobs/commitChangesToGit';
import runCheckTypingsScript from './jobs/runCheckTypingsScript';
import runTypingCoverageScript from './jobs/runTypingCoverageScript';
import runTestScript from './jobs/runTestScript';

type RunOptions = {
  prepare?: boolean;
  preBuildChecks?: boolean;
  build?: boolean;
  postBuildChecks?: boolean;
  commit?: boolean;

  // For monorepositories. These split the `build` phase, so the typings for
  // every package can be emitted before any package's bundle is built.
  buildTypings?: boolean;
  buildBundle?: boolean;
  quietTypings?: boolean;
  packageName?: string;
};

type RunResult = {
  /**
   * Whether the typings build succeeded. Always true when it did not run.
   */
  typingsOk: boolean;
};

/**
 * Automatically detect and run the appropriate CI jobs for the current repository.
 *
 * Pass a custom path as the first parameter to run the CI jobs for a specific
 * subdirectory of the repository (useful for monorepo).
 */
export default async function runCiJobs(path = './', options: RunOptions = {}): Promise<RunResult> {
  const {
    prepare = true,
    preBuildChecks = true,
    build = true,
    postBuildChecks = true,
    commit = true,
    buildTypings = build,
    buildBundle = build,
    quietTypings = false,
    packageName,
  } = options;

  log(`-- [${packageName || '-'}] Beginning CI jobs...`);
  debugLog(`** [${packageName || '-'}] Running CI jobs in \`${path}\``);

  const jp = jetpack.cwd(path);
  const pm = new JSPackageManagerInterop(path);
  const packageJson = await pm.getPackageJson();

  if (!packageJson) return { typingsOk: true };

  if (prepare) {
    await installJsDependencies(pm);
  }

  if (preBuildChecks) {
    await runFormatCheckScript(pm, packageJson);
    await runTypingCoverageScript(pm, packageJson);
  }

  let typingsOk = true;

  if (buildTypings) {
    typingsOk = await runBuildTypingsScript(pm, packageJson, { quiet: quietTypings });
  }

  if (buildBundle) {
    await runBuildScript(pm, packageJson);
  }

  if (postBuildChecks) {
    await runCheckTypingsScript(pm, packageJson);
    await runTestScript(pm, packageJson);
  }

  if (commit) {
    await commitChangesToGit(jp);
  }

  return { typingsOk };
}
