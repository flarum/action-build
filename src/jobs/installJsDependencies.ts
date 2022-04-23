import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';
import { log } from '../helper/log';

/**
 * Installs JS dependencies using the selected package manager.
 */
export default async function installJsDependencies(packageManager: JSPackageManagerInterop): Promise<void> {
  log(`-- Installing Javascript dependencies...`);
  await packageManager.installJsDependencies();
}
