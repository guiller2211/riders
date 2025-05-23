import {
  View,
  Text,
  PersonalDetails,
  useAuth,
  Modal,
  Dismissible,
  useToggle,
  AlertNotification,
  AlertNotificationEnum,
} from '@riders/ui';
import type {
  loader,
} from '../../../routes/my-account.personal-details';
import { useState } from 'react';
import { updateCustomer } from '../../../service/user.data.service';
import { User } from 'firebase/auth';
import { useLoaderData } from '@remix-run/react';

const PersonalDetailsPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const { customer } = loaderData;
  const [user, setUser] = useState(customer);
  const [result, setResult] = useState<AlertNotificationEnum>();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const { active, activate, deactivate } = useToggle(false);
  const { auth } = useAuth();

  const onSubmitHandler = async (value: any) => {
    if (!auth) {
      console.error('user is null');
      return;
    }
  
    try {
      const { data, success, message } = await updateCustomer(value, auth.currentUser as User);
  
      if (data) {
        setUser(data);
      }
      setResult(success ? AlertNotificationEnum.Success : AlertNotificationEnum.Error);
      setMessage(message);
      activate(); // Abre el modal
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

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
        <PersonalDetails user={user!} onSubmitHandler={onSubmitHandler} />
      </View.Item>
      <Modal active={active} onClose={deactivate}>
        <View gap={3}>
          <View backgroundColor="neutral-faded" >
            <AlertNotification
              type={result!}
              message={message}
              close={deactivate}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default PersonalDetailsPage;
