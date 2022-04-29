import * as core from '@actions/core';

import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { debugLog, log } from '../helper/log';

/**
 * Runs typings coverage script using the selected package manager, if the feature
 * is enabled.
 */
export default async function runTypingCoverageScript(packageManager: JSPackageManagerInterop): Promise<void> {
  const typingCoverageScript = core.getInput('type_coverage_script');
  if (typingCoverageScript === '') {
    debugLog(`** Skipping typing coverage check script`);
    return;
  }

  log(`-- Running Typescript typing coverage check script...`);
  await packageManager.runPackageScript(typingCoverageScript);
}
