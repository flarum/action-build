import { execFile } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execFile);

export { exec };
