import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';

/**
 * Runs check typings script using the selected package manager, if the feature
 * is enabled.
 */
export default async function runCheckTypingsScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const checkTypingsScript = core.getInput('check_typings_script');
  if (checkTypingsScript === '') {
    debugLog(`** Skipping typings check script`);
    return;
  }

  log(`-- Running Typescript typings check script...`);
  await packageManager.runPackageScript(checkTypingsScript);
}
