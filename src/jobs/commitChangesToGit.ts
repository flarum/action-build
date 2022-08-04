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
      name: 'flarum-bot',
      email: 'bot@flarum.org',
    },
  };

  const git = simpleGit(options);

  await git.addConfig('user.name', config.author.name).addConfig('user.email', config.author.email);

  debugLog(`** Staging all changes`);

  if (core.getInput('commit_all_dirty') !== '') await git.add(['./*', '-A']);

  await git.add(['*/*/js/dist-typings/*', '-f']);
  await git.add(['*/*/js/dist/*', '-f']);

  const hash = process.env.GITHUB_SHA;

  debugLog(`** Committing staged changes`);
  await git.commit(`Bundled output for commit ${hash}
Includes transpiled JS/TS${core.getInput('build_typings_script') !== '' ? ', and Typescript declaration files (typings)' : ''}.

[skip ci]`);

  const token = core.getInput('github_token', { required: true, trimWhitespace: true });

  debugLog(`** Pushing commit`);

  await git.addRemote('upstream', `https://${process.env.GITHUB_ACTOR}:${token}@github.com/${process.env.GITHUB_REPOSITORY}.git`);

  const status = await git.status();

  log(`${status}`);

  await git.push(`upstream`);

  log(`-- Pushed commit ${hash}`);
}
