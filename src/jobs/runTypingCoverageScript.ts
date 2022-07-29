import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';
import canRunScript from '../helper/canRunScript';

/**
 * Runs typings coverage script using the selected package manager, if the feature
 * is enabled.
 */
export default async function runTypingCoverageScript(packageManager: JSPackageManagerInterop, packageJson: any): Promise<void> {
  const typingCoverageScript = core.getInput('type_coverage_script');

  if (!canRunScript(typingCoverageScript, packageJson)) {
    debugLog(`** [${packageJson.name || '-'}] Skipping typing coverage check script`);
    return;
  }

  log(`-- [${packageJson.name || '-'}] Running Typescript typing coverage check script...`);
  await packageManager.runPackageScript(typingCoverageScript);
}
