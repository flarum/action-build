import * as core from '@actions/core';
import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';
import canRunScript from '../helper/canRunScript';

/**
 * Runs JS build script using the selected package manager.
 */
export default async function runBuildScript(packageManager: JSPackageManagerInterop, packageJson: any): Promise<void> {
  const buildScript = core.getInput('build_script', { required: true });

  if (!canRunScript(buildScript, packageJson)) {
    debugLog(`** [${packageJson.name || '-'}] Skipping build script`);
    return;
  }

  log(`-- [${packageJson.name || '-'}] Running Javascript build script...`);
  await packageManager.runPackageScript(buildScript);
}
