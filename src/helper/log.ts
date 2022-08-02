import { debug, info, isDebug } from '@actions/core';

/**
 * Logs to console only when `DEBUG=1` is set in the environment.
 */
export function debugLog(msg: string): boolean {
  if (!isDebug) return false;

  debug(msg);
  return true;
}

export function log(msg: string): boolean {
  info(msg);
  return true;
}
