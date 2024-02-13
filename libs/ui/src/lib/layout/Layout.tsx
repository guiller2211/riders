import { View } from '../components/atomic';
import type { LayoutProps } from '.';
import { Footer, Header } from '.';
import { useResponsiveClientValue } from '../hooks';

export const Layout = (props: LayoutProps) => {
  const { children, header } = props;

  return (
    <View gap={5} backgroundColor="black">
      <Header {...header} />

      <View paddingBottom={useResponsiveClientValue({ s: 12, l: 25 })}>{children}</View>

    </View>
  );
};
