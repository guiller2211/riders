import {
  View,
} from '@ducati/ui';
import {  useTypedLoaderData } from 'remix-typedjson';

import type {
  loader,
} from '../../../routes/my-account.payment-methods';

export default function PaymenMethodsPage() {
  const loaderData = useTypedLoaderData<typeof loader>();

  return (
      <View direction="row" gap={12}>
       
      </View>
  );
}
