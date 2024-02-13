import { useResponsiveClientValue as reUseResponsiveClientValue } from 'reshaped';
import type { ResponsiveOnly } from 'reshaped/types/global';

const useResponsiveClientValue = <T>(value: ResponsiveOnly<T>) => {
  return reUseResponsiveClientValue(value);
};
export default useResponsiveClientValue;
