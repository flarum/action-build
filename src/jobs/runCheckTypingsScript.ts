import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';
import canRunScript from '../helper/canRunScript';

/**
 * Runs check typings script using the selected package manager, if the feature
 * is enabled.
 */
export default async function runCheckTypingsScript(packageManager: JSPackageManagerInterop, packageJson: any): Promise<void> {
  const checkTypingsScript = core.getInput('check_typings_script');

  if (!canRunScript(checkTypingsScript, packageJson)) {
    debugLog(`** [${packageJson.name || '-'}] Skipping typings check script`);
    return;
  }

  log(`-- [${packageJson.name || '-'}] Running Typescript typings check script...`);
  await packageManager.runPackageScript(checkTypingsScript);
}
