/**
 * Equivalent to `Array.prototype.filter`, but works with asynchronous predicates.
 */
export async function asyncArrayFilter<T>(arr: T[], predicate: (value: T, index: number, array: T[]) => any | Promise<any>): Promise<T[]> {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
}

// Typescript-ified from source: https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
