import { useState } from 'react';

import { Text, View } from '../../../../atomic';
import { AlertNotification, AlertNotificationEnum } from '../../../shared';
import SignUpForm from '../SignUpForm';
import type { SignUpViewProps } from './SignUpView.types';

const SignUpView = (props: SignUpViewProps) => {
  const [hideNotification, setHideNotification] = useState(false);

  return (
    <View align="center" paddingTop={{ l: 4 }}>
      <View width={{ l: 160 }}>
        <View gap={6} direction="row">
          {props.notification && !hideNotification && (
            <View.Item columns={12}>
              <AlertNotification
                type={
                  props.success
                    ? AlertNotificationEnum.Success
                    : AlertNotificationEnum.Error
                }
                message={props.notification}
                close={() => setHideNotification(true)}
              />
            </View.Item>
          )}
          <View.Item columns={12}>
            <View paddingBottom={{ l: 3, s: 6 }}>
              <Text variant="featured-1">crear</Text>
            </View>
          </View.Item>
          <View.Item columns={12}>
            <SignUpForm
              sendForm={props.sendForm}
              titles={props.titles}
              isLoading={props.isLoading}
            />
          </View.Item>
        </View>
      </View>
    </View>
  );
};
export default SignUpView;
