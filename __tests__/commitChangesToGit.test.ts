import * as cp from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import jetpack from 'fs-jetpack';
import { expect, test, beforeEach, afterEach, jest } from '@jest/globals';

import commitChangesToGit from '../src/jobs/commitChangesToGit';

// The action pushes to a hardcoded github.com URL derived from
// GITHUB_REPOSITORY, which we can't reach from a test. Stub the network-facing
// steps (addRemote/push) so the local staging + commit behaviour — the part
// under test — runs for real against the temp repo.
jest.mock('simple-git', () => {
  const actual = jest.requireActual('simple-git') as { default: (...args: any[]) => any };
  return {
    __esModule: true,
    default: (...args: any[]) => {
      const git = actual.default(...args);
      git.addRemote = async () => git;
      git.push = async () => git;
      return git;
    },
  };
});

/**
 * These tests exercise the real git behaviour of `commitChangesToGit` against a
 * throwaway repository, with a local bare repo standing in for the GitHub
 * "upstream" remote so the final push succeeds without a network.
 */

let workDir: string;
let remoteDir: string;

function git(dir: string, args: string[]): string {
  return cp.execFileSync('git', args, { cwd: dir, encoding: 'utf8' });
}

beforeEach(() => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'action-build-'));
  workDir = path.join(tmp, 'repo');
  remoteDir = path.join(tmp, 'remote.git');

  // A bare repo to act as `upstream`.
  fs.mkdirSync(remoteDir, { recursive: true });
  git(remoteDir, ['init', '--bare', '--initial-branch=main']);

  // The working repo, wired to the bare repo as `origin`.
  fs.mkdirSync(workDir, { recursive: true });
  git(workDir, ['init', '--initial-branch=main']);
  git(workDir, ['config', 'user.email', 'seed@example.com']);
  git(workDir, ['config', 'user.name', 'seed']);
  git(workDir, ['remote', 'add', 'origin', remoteDir]);

  // Seed an initial commit so the branch exists, with dist gitignored.
  fs.writeFileSync(path.join(workDir, '.gitignore'), 'js/dist\njs/dist-typings\n');
  git(workDir, ['add', '.gitignore']);
  git(workDir, ['commit', '-m', 'initial']);
  git(workDir, ['push', 'origin', 'main']);

  // The action pushes to a remote it derives from GITHUB_REPOSITORY. Point that
  // at our bare repo, and clear inputs from any previous test.
  process.env.GITHUB_SHA = 'testsha';
  process.env.GITHUB_REPOSITORY = remoteDir;
  process.env.GITHUB_TOKEN = '';
  for (const key of Object.keys(process.env)) {
    if (key.startsWith('INPUT_')) delete process.env[key];
  }
});

afterEach(() => {
  jetpack.remove(path.dirname(workDir));
});

test('commits gitignored js/dist output', async () => {
  // Simulate a production build writing compiled output into a gitignored dir.
  jetpack.write(path.join(workDir, 'js/dist/forum.js'), '// built');

  await commitChangesToGit(jetpack.cwd(workDir));

  // The bundled file must be present in HEAD despite being gitignored.
  const tracked = git(workDir, ['ls-tree', '-r', '--name-only', 'HEAD']);
  expect(tracked).toContain('js/dist/forum.js');

  // And the message should mark it as bundled output.
  const subject = git(workDir, ['log', '-1', '--pretty=%s']);
  expect(subject).toContain('Bundled output for commit testsha');
});

test('does nothing when there is no build output to commit', async () => {
  const before = git(workDir, ['rev-parse', 'HEAD']).trim();

  await commitChangesToGit(jetpack.cwd(workDir));

  const after = git(workDir, ['rev-parse', 'HEAD']).trim();
  expect(after).toBe(before);
});

test('respects do_not_commit', async () => {
  process.env.INPUT_DO_NOT_COMMIT = 'true';
  jetpack.write(path.join(workDir, 'js/dist/forum.js'), '// built');

  const before = git(workDir, ['rev-parse', 'HEAD']).trim();
  await commitChangesToGit(jetpack.cwd(workDir));
  const after = git(workDir, ['rev-parse', 'HEAD']).trim();

  expect(after).toBe(before);
});
