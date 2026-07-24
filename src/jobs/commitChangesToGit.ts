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

  const gitActorName = core.getInput('git_actor_name', { required: false, trimWhitespace: true }) || 'flarum-bot';
  const gitActorEmail = core.getInput('git_actor_email', { required: false, trimWhitespace: true }) || 'bot@flarum.org';

  const config = {
    author: {
      name: gitActorName,
      email: gitActorEmail,
    },
  };

  const git = simpleGit(options);

  await git.addConfig('user.name', config.author.name).addConfig('user.email', config.author.email);

  debugLog(`** Staging changes`);

  if (core.getInput('commit_all_dirty') === 'true') {
    await git.add(['-A']);
  } else {
    // Stage the compiled output. These directories are typically gitignored
    // (so they are not committed to feature branches), which means a plain
    // `git add` — and `git status`, which powers simple-git's `isClean()` —
    // would never see them. We force-add the paths so the bundled output is
    // committed regardless of .gitignore. Missing directories are ignored
    // (e.g. a repo with no typings build).
    for (const dir of ['js/dist', 'js/dist-typings']) {
      if (jp.exists(dir) === 'dir') {
        debugLog(`** Force-staging ${dir}`);
        await git.raw(['add', '--force', '--', dir]);
      }
    }
  }

  // Decide whether to commit based on what is actually staged, rather than on
  // the working-tree status: gitignored files never show up as "dirty", so an
  // `isClean()` check would wrongly report nothing to commit.
  const staged = await git.diff(['--cached', '--name-only']);

  if (staged.trim() === '') {
    log('No changes to commit.');
    return;
  }

  const hash = process.env.GITHUB_SHA;

  debugLog(`** Committing staged changes`);
  await git.commit(`Bundled output for commit ${hash}
Includes transpiled JS/TS${core.getInput('build_typings_script') !== '' ? ', and Typescript declaration files (typings)' : ''}.

[skip ci]`);

  debugLog(`** Pushing commit`);

  await git.addRemote('upstream', `https://github-actions:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`);

  log(`Staged for commit:\n${staged}`);

  await git.push(`upstream`);

  log(`-- Pushed commit ${hash}`);
}
