import { Button, Text, TextField, View } from '../../../atomic';
import { IconEyeSlashFill } from '../../../../icons';

const ResetPasswordForm = () => {

  return (
    <View align="center" paddingTop={{ l: 4 }}>
      <View width={{ l: 160 }}>
        <View gap={6} direction="row">
          <View.Item columns={12}>
            <View paddingBottom={{ l: 3, s: 4 }}>
              <Text variant="featured-1">
                recuperar clave
              </Text>
            </View>
          </View.Item>

          <View.Item columns={12}>
            <TextField
              name="password"
              placeholder="ingrese clave"
              size="xlarge"
              endIcon={IconEyeSlashFill}
              inputAttributes={{ type: 'password' }}
            />
          </View.Item>

          <View.Item columns={12}>
            <TextField
              name="confirmPassword"
              placeholder="repita clave"
              size="xlarge"
              endIcon={IconEyeSlashFill}
              inputAttributes={{ type: 'password' }}
            />
          </View.Item>

          <View.Item columns={12}>
            <View paddingTop={5}>
              <Button fullWidth color="primary" size="xlarge">
                recuperar
              </Button>
            </View>
          </View.Item>
        </View>
      </View>
    </View>
  );
};
export default ResetPasswordForm;
