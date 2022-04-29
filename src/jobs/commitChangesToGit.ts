import * as fs from 'fs';
import * as core from '@actions/core';

import git, { GitAuth } from 'isomorphic-git';
import * as http from 'isomorphic-git/http/node';

import { debugLog, log } from '../helper/log';

import type { FSJetpack } from 'fs-jetpack/types';

/**
 * Commits and pushes all Git changes.
 */
export default async function commitChangesToGit(jp: FSJetpack): Promise<void> {
  log(`-- Commiting changes to Git...`);

  /**
   * Significantly improves performance during git IO operations
   *
   * @see https://isomorphic-git.org/docs/en/cache
   */
  let gitCache = {};

  const repo = {
    fs,
    dir: jp.cwd(),
    cache: gitCache,
  };

  debugLog(`** Staging all changes`);
  // Equivalent of `git add -A .`
  // https://isomorphic-git.org/docs/en/snippets#git-add-a-
  await git
    .statusMatrix(repo)
    .then((status) =>
      Promise.all(status.map(([filepath, , worktreeStatus]) => (worktreeStatus ? git.add({ ...repo, filepath }) : git.remove({ ...repo, filepath }))))
    );

  const commits = await git.log({ ...repo, depth: 1 });
  const lastCommit = commits[0];
  const lastCommitHash = lastCommit?.oid ?? '';

  debugLog(`** Committing staged changes`);
  await git.commit({
    ...repo,
    message: `Bundled output for commit \`${lastCommitHash}\`
Includes transpiled JS/TS${core.getInput('build_typings_script') !== '' ? ', and Typescript declaration files (typings)' : ''}.

[skip ci]`,
  });

  debugLog(`** Pushing commit`);
  await git.push({
    ...repo,
    http,
    onAuth: () => ({
      username: core.getInput('github_token', { required: true, trimWhitespace: true }),
    }),
  });

  // Force cache garbage collection
  gitCache = {};
}
