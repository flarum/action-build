import * as core from '@actions/core';
import { handleFlarumMonorepo } from './monorepo/handleFlarumMonorepo';
import runCiJobs from './runCiJobs';

async function run(): Promise<void> {
  try {
    // If this is a monorepo, handle it separately, else continue
    if (await handleFlarumMonorepo()) return;

    await runCiJobs();
  } catch (error) {
    if (error instanceof Error || typeof error === 'string') core.setFailed(error);
    else core.setFailed(JSON.stringify(error));
  }
}

run();
