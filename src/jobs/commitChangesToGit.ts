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
    // committed regardless of .gitignore.
    //
    // The globs match `js/dist` and `js/dist-typings` at ANY depth, so a
    // monorepo's per-package output (e.g. `framework/core/js/dist`,
    // `extensions/<name>/js/dist`) is picked up as well as a single-package
    // top-level `js/dist`. Third-party copies under `vendor/` and
    // `node_modules/` are excluded so they are never committed.
    //
    // Each output glob is staged separately: `git add` fails the whole command
    // if any pathspec matches nothing, and a repo may legitimately have `dist`
    // but no `dist-typings` (or neither). Staging them independently — and
    // tolerating a no-match — keeps one missing directory from aborting the rest.
    for (const glob of ['**/js/dist/**', '**/js/dist-typings/**']) {
      debugLog(`** Force-staging ${glob}`);
      try {
        await git.raw(['add', '--force', '--', `:(glob)${glob}`, ':(glob,exclude)**/vendor/**', ':(glob,exclude)**/node_modules/**']);
      } catch (e) {
        // "pathspec did not match any files" is expected when this output
        // directory doesn't exist; anything else is a real error.
        if (!(e instanceof Error) || !/did not match any files/.test(e.message)) {
          throw e;
        }
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
