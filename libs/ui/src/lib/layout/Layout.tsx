import { View } from '../components/atomic';
import type { LayoutProps } from '.';
import { HeaderAdditionalBar } from '.';
import { useResponsiveClientValue } from 'reshaped';

export const Layout = (props: LayoutProps) => {
  const { children, header } = props;

  return (
    <View direction='row' gap={5} divided>
      {/* <Header {...header} /> */}
      {
        header.user.isLoggedIn &&
        (
          <View.Item columns={3}>
            <HeaderAdditionalBar {...header} />
          </View.Item>
        )
      }

      <View.Item columns={header.user.isLoggedIn ? 9 : 12}>
        <View paddingBottom={useResponsiveClientValue({ s: 12, l: 25 })}>
          {children}
        </View>
      </View.Item>
    </View>
  );
};
