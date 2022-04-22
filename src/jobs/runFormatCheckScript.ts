import * as core from '@actions/core';
import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';

/**
 * Runs JS formatting checker script from `package.json`, if the feature
 * is enabled.
 */
export default async function runFormatCheckScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const checkFormattingScript = core.getInput('format_script');
  if (checkFormattingScript === '') return;

  await packageManager.runPackageScript(checkFormattingScript);
}
