import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import type PackageJson from '../helper/PackageJson';
import { debugLog, log } from '../helper/log';
import canRunScript from '../helper/canRunScript';

/**
 * Runs typings coverage script using the selected package manager, if the feature
 * is enabled.
 */
export default async function runTestScript(packageManager: JSPackageManagerInterop, packageJson: PackageJson): Promise<void> {
  const testScript = core.getInput('test_script');

  if (!canRunScript(testScript, packageJson)) {
    debugLog(`** [${packageJson.name || '-'}] Skipping test script`);
    return;
  }

  log(`-- [${packageJson.name || '-'}] Running test script...`);
  await packageManager.runPackageScript(testScript);
}
