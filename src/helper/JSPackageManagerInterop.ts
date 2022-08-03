import * as core from '@actions/core';
import jetpack from 'fs-jetpack';
import path from 'path';
import { exec as __external_exec } from './exec';
import { debugLog } from './log';

export default class JSPackageManagerInterop {
  static readonly SupportedPackageManagers = ['yarn', 'npm', 'pnpm'];

  /**
   * Name of the JS package manager to use.
   *
   * @example "npm"
   * @example "yarn"
   * @example "pnpm"
   */
  private readonly packageManager: string;

  /**
   * Path to the root of the extension relative to the repository root (same
   * directory as the `composer.json` file).
   */
  private readonly extensionRoot: string;

  /**
   * Path to the extension's JS root folder relative to the extension root.
   */
  private readonly jsDirectory: string;

  /**
   * Absolute path to the JS root folder.
   */
  private pathToJsFolder: string;

  private oneTimeSetupComplete: boolean = false;

  constructor(extensionRoot?: string, packageManager?: string, jsDirectory?: string) {
    this.extensionRoot = extensionRoot ?? './';
    this.packageManager = packageManager ?? core.getInput('package_manager', { required: true });
    this.jsDirectory = jsDirectory ?? core.getInput('js_path', { required: true }) ?? './js';
    this.pathToJsFolder = path.resolve(jetpack.cwd(), jetpack.path(this.extensionRoot, this.jsDirectory));

    this.validatePackageManager();
  }

  /**
   * Installs all JS dependencies for this extension using the
   * manager's lockfile.
   *
   * If the lockfile is not up-to-date, this task will fail.
   */
  async installJsDependencies() {
    this.performOneTimeSetup();

    switch (this.packageManager) {
      case 'yarn':
        await this.exec(['install', '--frozen-lockfile']);
        break;

      case 'pnpm':
        await this.exec(['install', '--frozen-lockfile']);
        break;

      case 'npm':
        await this.exec(['ci']);
        break;
    }
  }

  /**
   * Runs the provided `package.json` script, with the provided
   * arguments.
   *
   * @param script Name of the `package.json` script to run.
   * @param options Any options to pass to the script.
   * @param { exitOnError }
   */
  async runPackageScript(script: string, options?: string[], { exitOnError = true } = {}) {
    this.performOneTimeSetup();

    switch (this.packageManager) {
      case 'yarn':
      case 'pnpm':
      case 'npm':
        const extensionName = this.extensionRoot.split('/').pop();
        const errorMessage = `[${extensionName}] Failed running (${script})`;

        const result = await this.exec(['run', script, ...(options ?? [])]).catch((error) => {
          if (exitOnError) {
            debugLog(error);
            core.setFailed(errorMessage);
          } else core.warning(errorMessage);
        });

        debugLog(`** [${extensionName}] Result of (${script}): ${(result && result.code) || 'unknown'}`);

        if (!result || result.code !== 0) debugLog(`** [${extensionName}] Failed running (${script})`);

        break;
    }
  }

  /**
   * If not already completed, performs any one-time setup to support
   * a package manager.
   *
   * For example, this might include the setting of flags or config
   * options inside the package manager, or installing a thirs-party
   * package manager.
   */
  private async performOneTimeSetup() {
    if (this.oneTimeSetupComplete) return;

    switch (this.packageManager) {
      case 'pnpm':
        await __external_exec('npm', ['install', '--global', 'pnpm'], {});
        break;
    }

    this.oneTimeSetupComplete = true;
  }

  /**
   * Ensures that the provided package manager is supported by this
   * interop module.
   */
  private validatePackageManager() {
    if (!JSPackageManagerInterop.SupportedPackageManagers.includes(this.packageManager)) {
      throw new Error(`Unsupported package manager: ${this.packageManager}`);
    }
  }

  /**
   * Executes a JS package manager command from the root of the
   * extension's JS folder.
   */
  private exec(options: string[]) {
    return __external_exec(this.packageManager, options, { cwd: this.pathToJsFolder });
  }

  /**
   * Parses `package.json` and returns an object.
   */
  public async getPackageJson(): Promise<any> {
    const monorepo = !jetpack.exists(this.pathToJsFolder + '/package.json');

    // This is needed for a monorepo context.
    if (monorepo) this.pathToJsFolder = path.resolve(jetpack.cwd(), jetpack.path(this.extensionRoot, './js'));

    return await jetpack.readAsync(this.pathToJsFolder + '/package.json', 'json');
  }
}
