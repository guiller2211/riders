import { useIsomorphicLayoutEffect as reUseIsomorphicLayoutEffect } from 'reshaped';

import type { IsomorphicLayoutEffectProps } from './useIsomorphicLayoutEffect.types';

const useIsomorphicLayoutEffect = (props: IsomorphicLayoutEffectProps) => {
  return reUseIsomorphicLayoutEffect(props.effect, props.deps);
};
export default useIsomorphicLayoutEffect;
