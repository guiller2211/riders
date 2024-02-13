import type { ThemeProps } from 'reshaped';
import { Theme } from 'reshaped';

const ThemeProvider = (props: ThemeProps) => {
  return <Theme {...props} />;
};
export default ThemeProvider;
