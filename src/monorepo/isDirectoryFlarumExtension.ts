import jetpack from 'fs-jetpack';

export default async function isDirectoryFlarumExtension(pathFromRoot: string): Promise<boolean> {
  const composerJson = await jetpack.readAsync(`${pathFromRoot}/composer.json`, 'json');

  if (composerJson === undefined) return false;

  if (composerJson.type === 'flarum-extension') return true;

  // Special case for monorepo
  if (composerJson.name === 'flarum/core') return true;

  return false;
}
