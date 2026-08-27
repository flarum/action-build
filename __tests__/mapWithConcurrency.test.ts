import { describe, expect, it } from '@jest/globals';

import mapWithConcurrency from '../src/helper/mapWithConcurrency';

const tick = () => new Promise((resolve) => setTimeout(resolve, 5));

describe('mapWithConcurrency', () => {
  it('returns results in input order', async () => {
    const results = await mapWithConcurrency([1, 2, 3, 4, 5], 2, async (n) => {
      // Later items resolve sooner, so ordering cannot come from completion order.
      await new Promise((resolve) => setTimeout(resolve, (6 - n) * 5));

      return n * 10;
    });

    expect(results).toEqual([10, 20, 30, 40, 50]);
  });

  it('never exceeds the concurrency limit', async () => {
    let inFlight = 0;
    let peak = 0;

    await mapWithConcurrency(
      Array.from({ length: 12 }, (_, i) => i),
      3,
      async () => {
        inFlight++;
        peak = Math.max(peak, inFlight);
        await tick();
        inFlight--;
      }
    );

    expect(peak).toBe(3);
  });

  it('runs every item even when the limit exceeds the item count', async () => {
    const seen: number[] = [];

    await mapWithConcurrency([1, 2, 3], 10, async (n) => {
      await tick();
      seen.push(n);
    });

    expect(seen.sort()).toEqual([1, 2, 3]);
  });

  it('treats a zero or negative limit as one at a time', async () => {
    let inFlight = 0;
    let peak = 0;

    await mapWithConcurrency([1, 2, 3, 4], 0, async () => {
      inFlight++;
      peak = Math.max(peak, inFlight);
      await tick();
      inFlight--;
    });

    expect(peak).toBe(1);
  });

  it('handles an empty list', async () => {
    await expect(mapWithConcurrency([], 4, async () => 'never')).resolves.toEqual([]);
  });

  it('rejects when a task rejects, like Promise.all', async () => {
    await expect(
      mapWithConcurrency([1, 2, 3], 2, async (n) => {
        if (n === 2) throw new Error('boom');

        return n;
      })
    ).rejects.toThrow('boom');
  });
});
