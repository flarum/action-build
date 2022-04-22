import * as core from '@actions/core';
import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';

/**
 * Runs JS build script using the selected package manager.
 */
export default async function runBuildScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const buildScript = core.getInput('build_script', { required: true });

  await packageManager.runPackageScript(buildScript);
}
