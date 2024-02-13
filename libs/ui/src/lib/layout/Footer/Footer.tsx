import { Placeholder } from 'reshaped';

import { View } from '../../components/atomic';
import type { FooterProps } from './Footer.types';

export const Footer = (props: FooterProps) => {
  const { ...rest } = props;
  return (
    <View as="footer" {...rest}>
      <Placeholder w={100} />
      Footer
    </View>
  );
};
