import * as core from '@actions/core';
import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';

/**
 * Runs JS build script using the selected package manager.
 */
export default async function runBuildTypingsScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const buildTypingsScript = core.getInput('typings_script');
  if (buildTypingsScript === '') return;

  await packageManager.runPackageScript(buildTypingsScript);
}
