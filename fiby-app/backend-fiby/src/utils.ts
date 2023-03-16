/**
 * Returns the nth term in the Fibonacci Sequence.
 * Note: This function is memoized
 */
export const fibonacci = memoize((n: number): number => {
  if (n < 2) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
});

/**
 * Memoizes function returns in cache (Map).
 * @returns A memoized version of the original function.
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();

  return function (this: unknown, ...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  } as T;
}
