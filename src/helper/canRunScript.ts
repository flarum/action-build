import { debugLog } from './log';

export default function canRunScript(script: string, packageJson: any): boolean {
  const result = script !== '' && !!(packageJson && packageJson.scripts && packageJson.scripts[script]);

  debugLog(`** [${packageJson.name || '-'}] Checking if script ${script} is enabled: ${result}`);

  return result;
}
