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
  noPrepare?: boolean;
  noPreBuildChecks?: boolean;
  noBuild?: boolean;
  noPostBuildChecks?: boolean;
  noCommit?: boolean;

  // For monorepositories.
  packageName?: string;
};

/**
 * Automatically detect and run the appropriate CI jobs for the current repository.
 *
 * Pass a custom path as the first parameter to run the CI jobs for a specific
 * subdirectory of the repository (useful for monorepo).
 */
export default async function runCiJobs(
  path = './',
  { noPrepare, noPreBuildChecks, noBuild, noPostBuildChecks, noCommit, packageName }: RunOptions = {}
): Promise<void> {
  log(`-- [${packageName || '-'}] Beginning CI jobs...`);
  debugLog(`** [${packageName || '-'}] Running CI jobs in \`${path}\``);

  const jp = jetpack.cwd(path);
  const pm = new JSPackageManagerInterop(path);
  const packageJson = await pm.getPackageJson();

  if (!packageJson) return;

  if (!noPrepare) {
    await installJsDependencies(pm);
  }
  if (!noPreBuildChecks) {
    await runFormatCheckScript(pm, packageJson);
    await runTypingCoverageScript(pm, packageJson);
  }
  if (!noBuild) {
    await runBuildTypingsScript(pm, packageJson);
    await runBuildScript(pm, packageJson);
  }
  if (!noPostBuildChecks) {
    await runCheckTypingsScript(pm, packageJson);
    await runTestScript(pm, packageJson);
  }
  if (!noCommit) {
    await commitChangesToGit(jp);
  }
}
