// @ts-expect-error
import promiseSpawn from '@npmcli/promise-spawn';

import type { SpawnOptions, SpawnOptionsWithStdioTuple, StdioNull, StdioPipe } from 'child_process';

type Merge<FirstType, SecondType> = Omit<FirstType, keyof SecondType> & SecondType;

interface DefaultSpawnResult {
  code: number;
  signal: null;
  stdout: Buffer | string;
  stderr: Buffer | string;
}

type SpawnResult<Extra extends Record<string, unknown> = {}> = Merge<Extra, DefaultSpawnResult>;

interface CustomSpawnOptions {
  stdioString?: boolean;
}

type FinalSpawnOptions = (SpawnOptions | SpawnOptionsWithStdioTuple<StdioPipe | StdioNull, StdioPipe | StdioNull, StdioPipe | StdioNull>) &
  CustomSpawnOptions;

export function exec<Extra extends Record<string, unknown> = {}>(
  cmd: string,
  args: ReadonlyArray<string>,
  opts: FinalSpawnOptions = {},
  extra?: Extra
): Promise<SpawnResult<Extra>> {
  return promiseSpawn(cmd, args, { ...opts, stdio: 'inherit' }, extra);
}
