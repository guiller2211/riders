import {
  View,
  Text,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import type {
  loader as myAccountLoader,
  loader,
} from '../../../routes/my-account.personal-details';

const PersonalDetailsPageInner = () => {
  const myAccountData = useTypedLoaderData<typeof myAccountLoader>();
  const { user } = myAccountData.user!;

  return (
    <View direction="row" gap={12} paddingBlock={0}>
      <View.Item columns={12}>
        <Text variant="body-3">Datos personales</Text>
      </View.Item>
      <View.Item columns={12}>
        {/* <PersonalDetails user={user} /> */}
      </View.Item>
    </View>
  );
};

// FIXME: layout should inject provider
const PersonalDetailsPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  return (
      <PersonalDetailsPageInner />
  );
};

export default PersonalDetailsPage;
