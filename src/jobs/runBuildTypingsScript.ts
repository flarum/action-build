import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';

/**
 * Runs build typings script using the selected package manager, if the feature
 * is enabled.
 */
export default async function runBuildTypingsScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const buildTypingsScript = core.getInput('typings_script');
  if (buildTypingsScript === '') return;

  await packageManager.runPackageScript(buildTypingsScript);
}
