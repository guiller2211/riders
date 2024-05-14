import {
  AlertNotification,
  AlertNotificationEnum,
  ForgotPasswordForm,
  I18nContext,
  Loading,
  View,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';
import { useState } from 'react';

import { action } from '../../routes/forgot-password';
import type { loader } from '../../routes/forgot-password';
import { forgotPassword } from '../../service/login.service';

const ForgotPasswordPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState(false);
  const [message, setMessage] = useState('');
  const [featuredProducts, setFeaturedProducts] =
    useState<any>();

  const request = async (value: string) => {
    setIsLoading(true);
    try {
      const response = await forgotPassword(value);
      console.log(response);
      setResult(response.result);
      setMessage(response.message)
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setMessage(`${error}`);
      setResult(false);
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  return (
    <View paddingInline={20}>
      {!result && showAlert && (
        <View.Item columns={12}>
          <AlertNotification
            type={AlertNotificationEnum.Error}
            message={message}
            close={() => setShowAlert(false)}
          />
        </View.Item>
      )}
      {isLoading ? (
        <Loading
          ariaLabel="layout:loader.ariaLabel"
          size="xlarge"
          text={{ message: 'layout:loader.message' }}
          view={{
            align: 'center',
            justify: 'center',
            paddingBlock: 20,
            paddingInline: 0,
          }}
        />
      ) : (
        <View>
          {result && (
            <View.Item columns={12}>
              <AlertNotification
                type={AlertNotificationEnum.Success}
                message={message}
                close={() => setShowAlert(false)}
              />
            </View.Item>
          )}
          <ForgotPasswordForm sendForm={request} />
        </View>
      )}
    </View>
  );
};
export default ForgotPasswordPage;
