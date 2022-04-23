import * as core from '@actions/core';
import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';

/**
 * Runs JS formatting checker script from `package.json`, if the feature
 * is enabled.
 */
export default async function runFormatCheckScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const checkFormattingScript = core.getInput('format_script');
  if (checkFormattingScript === '') {
    debugLog(`** Skipping JS formatting checker script`);
    return;
  }

  log(`-- Checking Javascript code formatting...`);
  await packageManager.runPackageScript(checkFormattingScript);
}
