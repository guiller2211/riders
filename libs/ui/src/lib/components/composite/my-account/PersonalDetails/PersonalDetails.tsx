import { EditPersonalDetailsForm } from '../EditPersonalDetailsForm';
import { formatDate } from '../../../../utils';
import { Text, View, Actionable } from '../../../atomic';
import { useOpenState } from '../../../../hooks';
import type { PersonalDetailsProps } from './PersonalDetails.types';
import type { PersonalDetailsFormState } from '../EditPersonalDetailsForm';
import { Drawer, DrawerHeader } from '../../shared';

const PersonalDetails = (props: PersonalDetailsProps) => {
  const { user } = props;
  
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();

  const date = formatDate(user.lastModifiedAt ?? '');

  const onSubmitHandler = () => {
    // TODO: api call
  };

  return (
    <>
      <View direction="column" gap={8}  divided>
        <View direction="row">
          <View direction="column">
            <Text variant="body-2" weight="bold">
              Nombre
            </Text>
            <Text variant="body-3">{user.firstName} {user.lastName}</Text>
          </View>
          <View.Item gapBefore="auto">
            <View align="end">
              <Text variant="body-3" weight="medium" color="primary">
                <Actionable
                  attributes={{ style: { textDecoration: 'underline' } }}
                  onClick={onOpenDrawerHandler}
                >
                  Editar Nombre
                </Actionable>
              </Text>
            </View>
          </View.Item>
        </View>

        <View direction="row">
          <View direction="column">
            <Text variant="body-2" weight="bold">
              Email
            </Text>
            <Text variant="body-3">{user.email}</Text>
          </View>
          <View.Item gapBefore="auto">
            <View align="end">
              <Text variant="body-3" weight="medium" color="primary">
                <Actionable
                  attributes={{ style: { textDecoration: 'underline' } }}
                  onClick={onOpenDrawerHandler}
                >
                  Cambiar Email
                </Actionable>
              </Text>
            </View>
          </View.Item>
        </View>

        <View direction="row">
          <View direction="column">
            <Text variant="body-2" weight="bold">
            Contraseña de cuenta
            </Text>

            <Text variant="body-3">
              Ultima Actualizacion {date}
            </Text>
          </View>
          <View.Item gapBefore="auto">
            <View align="end">
              <Text variant="body-3" weight="medium" color="primary">
                <Actionable
                  attributes={{ style: { textDecoration: 'underline' } }}
                  onClick={onOpenDrawerHandler}
                >
                  Cambiar Contraseña
                </Actionable>
              </Text>
            </View>
          </View.Item>
        </View>
      </View>

      <Drawer active={open} onClose={onCloseDrawerHandler}>
        <DrawerHeader
          title='Editar'
          onClose={onCloseDrawerHandler}
        />
        <EditPersonalDetailsForm
          onSubmit={onSubmitHandler}
          initialValues={user as unknown as PersonalDetailsFormState}
        />
      </Drawer>
    </>
  );
};
export default PersonalDetails;
