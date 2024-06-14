import { AppRoutes } from '@riders/types';
import { IconArrowRight, IconPersonCircle } from '../../../../icons';
import { Button, Card, Icon, Text, View } from '../../../atomic';

const PersonalDetailsTile = () => {

  return (
    <Card padding={6}>
      <View direction="row" gap={3}>
        <View.Item columns="auto">
          <Icon svg={IconPersonCircle} color="primary" size="medium" />
        </View.Item>
        <View.Item columns={10}>
          <View height={33}>
            <View paddingBottom={3}>
              <Text color="primary" variant="featured-3" weight="bold">
                Detalles Personal
              </Text>
            </View>
            <View paddingBottom={3}>
              <Text variant="body-3">
                Actualice su nombre, correo electrónico y contraseña de cuenta en cualquier momento.
              </Text>
            </View>
          </View>
          <View>
            <Button
              variant="ghost"
              color="primary"
              href={AppRoutes.PersonalDetails}
              endIcon={IconArrowRight}
            >
              Tu Detalle
            </Button>
          </View>
        </View.Item>
      </View>
    </Card>
  );
};
export default PersonalDetailsTile;
