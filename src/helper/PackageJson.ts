/**
 * The subset of a `package.json` file that this action reads.
 */
export default interface PackageJson {
  name?: string;
  scripts?: Record<string, string>;
  [key: string]: unknown;
}
