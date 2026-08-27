import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import type PackageJson from '../helper/PackageJson';
import { debugLog, log } from '../helper/log';
import canRunScript from '../helper/canRunScript';

/**
 * Runs build typings script using the selected package manager, if the feature
 * is enabled.
 *
 * @param quiet Suppress the failure annotation, for a pass that will be retried.
 *
 * @return Whether the typings were built (or the script was skipped).
 */
export default async function runBuildTypingsScript(
  packageManager: JSPackageManagerInterop,
  packageJson: PackageJson,
  { quiet = false } = {}
): Promise<boolean> {
  const buildTypingsScript = core.getInput('build_typings_script');

  if (!canRunScript(buildTypingsScript, packageJson)) {
    debugLog(`** [${packageJson.name || '-'}] Skipping typings build script`);
    return true;
  }

  log(`-- [${packageJson.name || '-'}] Running Typescript typings build script...`);

  if (quiet) {
    return packageManager.runPackageScript(buildTypingsScript, [], { exitOnError: false, annotateFailure: false });
  }

  // Typings build often has errors -- let's not exit if we have any issues
  return packageManager.runPackageScript(buildTypingsScript, [], { exitOnError: false });
}
