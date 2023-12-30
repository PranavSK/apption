import { useEffect, useLayoutEffect } from 'react';

import { isBrowser } from '@/lib/utils/browser';

export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect;
