import { debugLog } from './log';
import type PackageJson from './PackageJson';

export default function canRunScript(script: string, packageJson: PackageJson): boolean {
  const result = script !== '' && !!(packageJson && packageJson.scripts && packageJson.scripts[script]);

  debugLog(`** [${packageJson.name || '-'}] Checking if script ${script} is enabled: ${result}`);

  return result;
}
