import {
  AlertNotification,
  AlertNotificationEnum,
  ForgotPasswordForm,
  Loading,
  View,
} from '@riders/ui';
import { useState } from 'react';

import { forgotPassword } from '../../service/login.service';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState(false);
  const [message, setMessage] = useState('');

  const request = async (value: string) => {
    setIsLoading(true);
    try {
      const response = await forgotPassword(value);
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
          ariaLabel="Cargando..."
          size="xlarge"
          text={{ message: 'Cargando...' }}
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
