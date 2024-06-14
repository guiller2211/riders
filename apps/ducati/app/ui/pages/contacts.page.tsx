import { loader } from '../../routes/contacts';
import { useLoaderData } from '@remix-run/react';
import { Contacts, View, useResponsiveClientValue } from '@ducati/ui';

export const ContactPage = () => {
  const { layout, product } = useLoaderData<typeof loader>();

  return (
    <View gap={10} paddingInline={useResponsiveClientValue({ s: 10, l: 30 })} paddingTop={10} direction="column" align='center'>
      <Contacts />
    </View>
  );
};


