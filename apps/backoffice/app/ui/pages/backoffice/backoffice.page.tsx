import {  View, useResponsiveClientValue } from '@backoffice/ui';

export const BackofficePage = () => {

  return (
    
    <View gap={10} paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}>
    hola mundo
    </View>
  );

};