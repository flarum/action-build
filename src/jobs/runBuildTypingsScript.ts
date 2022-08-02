import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';
import canRunScript from '../helper/canRunScript';

/**
 * Runs build typings script using the selected package manager, if the feature
 * is enabled.
 */
export default async function runBuildTypingsScript(packageManager: JSPackageManagerInterop, packageJson: any): Promise<void> {
  const buildTypingsScript = core.getInput('build_typings_script');

  if (!canRunScript(buildTypingsScript, packageJson)) {
    debugLog(`** [${packageJson.name || '-'}] Skipping typings build script`);
    return;
  }

  log(`-- [${packageJson.name || '-'}] Running Typescript typings build script...`);
  // Typings build often has errors -- let's not exit if we have any issues
  await packageManager.runPackageScript(buildTypingsScript, [], { exitOnError: false });
}
