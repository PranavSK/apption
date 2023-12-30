/* eslint-disable @typescript-eslint/ban-types */
import { useMemo, useRef } from 'react';

/**
 * Hook for persistent functions. In theory, `useMemoizedCallback` can be used instead of `useCallback`.
 * @description In some scenarios, we need to use `useCallback` to cache a function, but when the
 * second parameter deps changes, the function will be regenerated, causing the function reference
 * to change.
 * Using `useMemoizedCallback`, you can omit the second parameter deps, and ensure that the function
 * reference never change.
 * @param fn Function that requires persistance.
 * @returns Function whose reference never changes.
 */
export function useMemoizedCallback<T extends Function>(fn: T) {
  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<Function>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (this: unknown, ...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}
