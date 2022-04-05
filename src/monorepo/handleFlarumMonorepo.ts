import jetpack from 'fs-jetpack';
import { asyncArrayFilter } from '../helper/asyncFilter';
import runCiJobs from '../runCiJobs';
import isDirectoryFlarumExtension from './isDirectoryFlarumExtension';

interface IPackageInfo {
  name: string;
  gitRemote: string;
  mainBranch: string;
}

interface MonorepoJsonContent {
  packages: {
    extensions?: IPackageInfo[];
    composer?: IPackageInfo[];
    npm?: IPackageInfo[];
    core?: IPackageInfo;
  };
}

interface IPackageInfoWithPath extends IPackageInfo {
  pathToDir: string;
}

/**
 * Detects if there is a `flarum-monorepo.json` file in the repository root.
 *
 * If so, it will iterate over the extensions defined in the file, if present,
 * and run the appropriate CI jobs for each asynchronously.
 *
 * Returns `true` if the repo has a `flarum-monorepo.json` file and this file
 * has handled JS actions, `false` otherwise.
 */
export async function handleFlarumMonorepo(): Promise<boolean> {
  const monorepoJson: MonorepoJsonContent | undefined = await jetpack.readAsync('flarum-monorepo.json', 'json');

  // `undefined` means the file was not found
  if (monorepoJson === undefined) return false;

  const repositories =
    monorepoJson.packages.extensions?.map((extension) => ({
      ...extension,
      pathToDir: `./extensions/${extension.name}`,
    })) ?? [];

  // Special case for core
  if (monorepoJson.packages.core) {
    repositories.push({
      ...monorepoJson.packages.core,
      pathToDir: './framework/core',
    });
  }

  if (repositories.length === 0) return false;

  const filteredRepositories = await asyncArrayFilter(repositories, async (repository) => await isDirectoryFlarumExtension(repository.pathToDir));

  if (filteredRepositories.length === 0) return false;

  // Run the CI jobs for each repository in parallel and wait for completion
  await Promise.all(filteredRepositories.map((repository) => runCiJobs(repository.pathToDir)));

  return true;
}
