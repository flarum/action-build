import * as core from '@actions/core';
import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { log } from '../helper/log';

/**
 * Runs JS build script using the selected package manager.
 */
export default async function runBuildScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const buildScript = core.getInput('build_script', { required: true });

  log(`-- Running Javascript build script...`);
  await packageManager.runPackageScript(buildScript);
}
