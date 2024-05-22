import { View } from '../../../atomic';
import { useResponsiveClientValue } from '../../../../hooks';

import {
  AddressBookTile,
  OrdersTile,
  PersonalDetailsTile,
} from '../..';

const AccountOverview = () => {
  return (
    <View direction="row" gap={8}>
      <View.Item columns={useResponsiveClientValue({ l: 4, s: 12 })}>
        <PersonalDetailsTile />
      </View.Item>
      <View.Item columns={useResponsiveClientValue({ l: 4, s: 12 })}>
        <AddressBookTile />
      </View.Item>
     {/*  <View.Item columns={useResponsiveClientValue({ l: 4, s: 12 })}>
        <PaymentMethodsTile />
      </View.Item> */}
      <View.Item columns={useResponsiveClientValue({ l: 4, s: 12 })}>
        <OrdersTile />
      </View.Item>
    </View>
  );
};
export default AccountOverview;
