import { View } from '../components/atomic';
import type { LayoutProps } from '.';
import {  Footer, Header } from '.';
import { useResponsiveClientValue } from 'reshaped';

export const Layout = (props: LayoutProps) => {
  const { children, header, footer, handleAction, cart } = props;

  return (
    <View gap={5} backgroundColor='black'>
      <View.Item columns={12}>
        <Header {...header} handleAction={handleAction} cart={cart} />
      </View.Item>

      <View.Item columns={12}>
        <View paddingBottom={useResponsiveClientValue({ s: 12, l: 25 })}>
          {children}
        </View>
      </View.Item>

      <View.Item>
        <Footer {...footer} />
      </View.Item>
    </View>
  );
};
