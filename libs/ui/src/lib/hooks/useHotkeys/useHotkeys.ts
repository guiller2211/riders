import { useHotkeys as reUseHotkeys } from 'reshaped';

import type { HotkeysProps } from './useHotkeys.types';

const useHotkeys = (props: HotkeysProps) => {
  return reUseHotkeys(props);
};
export default useHotkeys;
