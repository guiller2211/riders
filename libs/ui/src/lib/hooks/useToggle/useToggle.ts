import { useToggle as reUseToggle } from 'reshaped';

const useToggle = (defaultValue?: boolean) => {
  return reUseToggle(defaultValue);
};
export default useToggle;
