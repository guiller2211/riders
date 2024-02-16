import { View } from '../components/atomic';
import type { LayoutProps } from '.';
import { Footer, Header } from '.';
import { useResponsiveClientValue } from 'reshaped';

export const Layout = (props: LayoutProps) => {
  const { children, header } = props;

  return (
    <View gap={5} backgroundColor="black">
      <View.Item columns={12}>
        <Header {...header} />
      </View.Item>

      <View.Item columns={12}>
        <View align="center">
          <View paddingBottom={{ s: 12, l: 25 }}>
            {children}
          </View>
        </View>
      </View.Item>
    </View>
  );
};
