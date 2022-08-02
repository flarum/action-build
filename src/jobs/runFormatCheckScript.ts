import * as core from '@actions/core';
import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';
import canRunScript from '../helper/canRunScript';

/**
 * Runs JS formatting checker script from `package.json`, if the feature
 * is enabled.
 */
export default async function runFormatCheckScript(packageManager: JSPackageManagerInterop, packageJson: any): Promise<void> {
  const checkFormattingScript = core.getInput('format_script');

  if (!canRunScript(checkFormattingScript, packageJson)) {
    debugLog(`** [${packageJson.name || '-'}] Skipping JS formatting checker script`);
    return;
  }

  log(`-- [${packageJson.name || '-'}] Checking Javascript code formatting...`);
  await packageManager.runPackageScript(checkFormattingScript);
}
