import { useCallback, useState } from 'react';

/**
 * A hook that returns a function which can be used to force the component to re-render.
 * @returns a function to trigger re-render.
 */
export const useForceRender = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};
