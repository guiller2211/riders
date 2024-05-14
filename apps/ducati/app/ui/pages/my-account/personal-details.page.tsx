import {
  View,
  Text,
  PersonalDetails,
  useResponsiveClientValue,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import type {
  loader as myAccountLoader,
  loader,
} from '../../../routes/my-account.personal-details';

const PersonalDetailsPageInner = () => {
  const myAccountData = useTypedLoaderData<typeof myAccountLoader>();
  const { user } = myAccountData;

  return (
    <View
      direction="row"
      gap={12}
      backgroundColor='white'
      padding={10}
      borderRadius='large'>
      <View.Item columns={12}>
        <Text variant="body-3">Datos personales</Text>
      </View.Item>
      <View.Item columns={12}>
        <PersonalDetails user={user!} />
      </View.Item>
    </View>
  );
};


const PersonalDetailsPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  return (
    <PersonalDetailsPageInner />
  );
};

export default PersonalDetailsPage;
