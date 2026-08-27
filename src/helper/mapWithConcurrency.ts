/**
 * Runs `fn` over every item, with at most `limit` items in flight at once.
 *
 * Results come back in input order. A rejected task rejects the returned
 * promise, the same way `Promise.all` does.
 */
export default async function mapWithConcurrency<T, R>(items: readonly T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  if (items.length === 0) return [];

  const results: R[] = new Array(items.length);
  const workerCount = Math.max(1, Math.min(Math.floor(limit) || 1, items.length));
  let nextIndex = 0;

  const workers = Array.from({ length: workerCount }, async () => {
    for (;;) {
      const index = nextIndex++;

      if (index >= items.length) return;

      results[index] = await fn(items[index], index);
    }
  });

  await Promise.all(workers);

  return results;
}
