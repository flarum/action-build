import * as fs from 'fs';
import * as core from '@actions/core';

import simpleGit, { SimpleGitOptions } from 'simple-git';

import { debugLog, log } from '../helper/log';

import type { FSJetpack } from 'fs-jetpack/types';

/**
 * Commits and pushes all Git changes.
 */
export default async function commitChangesToGit(jp: FSJetpack): Promise<void> {
  const doNotCommit = core.getInput('do_not_commit') === 'true';

  core.notice(doNotCommit ? 'Not committing changes to Git' : 'Committing changes to Git');

  if (doNotCommit) return;

  log(`-- Commiting changes to Git...`);

  const options: Partial<SimpleGitOptions> = {
    baseDir: jp.cwd(),
    maxConcurrentProcesses: 1,
  };

  const config = {
    author: {
      name: 'github-actions[bot]',
      email: '41898282+github-actions[bot]@users.noreply.github.com',
    },
  };

  const git = simpleGit(options);

  await git.addConfig('user.name', config.author.name).addConfig('user.email', config.author.email);

  const status = await git.status();

  if (status.isClean()) {
    log('No changes to commit.');
    return;
  }

  debugLog(`** Staging all changes`);

  if (core.getInput('commit_all_dirty') === 'true') await git.add(['-A']);

  status.files.forEach((file) => {
    if (file.path.match(/^([A-z0-9_\/-]*\/){0,1}js\/(?:dist|dist-typings)\/.*$/)) {
      debugLog(`** Staging ${file.path}`);
      git.add(file.path);
    }
  });

  const hash = process.env.GITHUB_SHA;

  debugLog(`** Committing staged changes`);
  await git.commit(`Bundled output for commit ${hash}
Includes transpiled JS/TS${core.getInput('build_typings_script') !== '' ? ', and Typescript declaration files (typings)' : ''}.

[skip ci]`);

  debugLog(`** Pushing commit`);

  await git.addRemote('upstream', `https://github-actions:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`);

  log(`${status}`);

  await git.push(`upstream`);

  log(`-- Pushed commit ${hash}`);
}
