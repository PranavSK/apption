import { type EffectCallback, useRef, useState } from 'react';

import { useIsomorphicEffect } from '@/hooks/use-isomorphic-effect';
import { isBrowser } from '@/lib/utils/browser';

function create<T extends string>(screens: Record<T, string>) {
  function useBreakpoint(breakpoint: T, defaultValue = false) {
    const [match, setMatch] = useState(defaultValue);
    const matchRef = useRef(defaultValue);

    useIsomorphicEffect(() => {
      if (!(isBrowser && window.matchMedia)) return undefined;

      function track() {
        const value = screens[breakpoint] ?? '999999px';
        const query = window.matchMedia(`(min-width: ${value})`);
        matchRef.current = query.matches;
        if (matchRef.current !== match) {
          setMatch(matchRef.current);
        }
      }

      window.addEventListener('resize', track);
      return () => window.removeEventListener('resize', track);
    });

    return match;
  }

  function useBreakpointEffect(breakpoint: T, effect: EffectCallback) {
    const match = useBreakpoint(breakpoint);
    useIsomorphicEffect(() => {
      if (match) return effect();
    }, [match]);
  }

  return { useBreakpoint, useBreakpointEffect };
}

export const { useBreakpoint, useBreakpointEffect } = create({
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
});
