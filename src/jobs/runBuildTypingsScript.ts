import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';

/**
 * Runs build typings script using the selected package manager, if the feature
 * is enabled.
 */
export default async function runBuildTypingsScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const buildTypingsScript = core.getInput('build_typings_script');
  if (buildTypingsScript === '') {
    debugLog(`** Skipping typings build script`);
    return;
  }

  log(`-- Running Typescript typings build script...`);
  await packageManager.runPackageScript(buildTypingsScript);
}
