import jetpack from 'fs-jetpack';

import JSPackageManagerInterop from './helper/JSPackageManagerInterop';
import installJsDependencies from './jobs/installJsDependencies';

/**
 * Automatically detect and run the appropriate CI jobs for the current repository.
 *
 * Pass a custom path as the first parameter to run the CI jobs for a specific
 * subdirectory of the repository (useful for monorepo).
 */
export default async function runCiJobs(path: string = './') {
  const jp = jetpack.cwd(path);
  const pm = new JSPackageManagerInterop(path);

  await installJsDependencies(pm);
}
