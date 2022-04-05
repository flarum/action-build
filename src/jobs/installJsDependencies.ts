import type JSPackageManagerInterop from '../helper/JSPackageManagerInterop';

/**
 * Installs JS dependencies using the selected package manager.
 */
export default async function installJsDependencies(packageManager: JSPackageManagerInterop): Promise<void> {
  await packageManager.installJsDependencies();
}
