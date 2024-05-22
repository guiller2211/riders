import { noop } from 'ramda-adjunct';
import cn from 'classnames';

import { Button, FormControl, TextField, View } from '../../../atomic';
import { Fields } from './EditPersonalDetailsForm.enums';
import {
  INITIAL_STATE,
  VALIDATION_SCHEMA,
} from './EditPersonalDetailsForm.constants';
import { DrawerContent, DrawerFooter, PasswordField } from '../../shared';
import { useFormikForReshaped } from '../../../../hooks';
import styles from './EditPersonalDetailsForm.module.css';
import type {
  EditPersonalDetailsFormProps,
  PersonalDetailsFormState,
} from './EditPersonalDetailsForm.types';

export const EditPersonalDetailsForm = (
  props: EditPersonalDetailsFormProps,
) => {
  const {
    className,
    initialValues = INITIAL_STATE,
    onSubmit = noop,
    ...rest
  } = props;


  const {
    errors,
    handleBlur,
    onChangeReshapedHandler,
    handleSubmit,
    isSubmitting,
    isValid,
    touched,
    values,
  } = useFormikForReshaped<PersonalDetailsFormState>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
    validationSchema: VALIDATION_SCHEMA,
  });

  const onSubmitHandler = () => {
    handleSubmit();
  };

  const disabled = isSubmitting || !isValid;

  return (
    <View className={cn(styles.root, className)} {...rest}>
      <DrawerContent gap={6}>
        <TextField
          name={Fields.FirstName}
          onBlur={handleBlur}
          onChange={onChangeReshapedHandler}
          placeholder='Nombre'
          size="xlarge"
          value={values[Fields.FirstName]}
        />

        <TextField
          name={Fields.LastName}
          onBlur={handleBlur}
          onChange={onChangeReshapedHandler}
          placeholder='Apellido'
          size="xlarge"
          value={values[Fields.LastName]}
        />

        <FormControl
          hasError={!!(touched[Fields.Email] && errors[Fields.Email])}
        >
          <TextField
            name={Fields.Email}
            onBlur={handleBlur}
            onChange={onChangeReshapedHandler}
            placeholder='Email'
            size="xlarge"
            value={values[Fields.Email]}
            disabled
          />

          {!!(touched[Fields.Email] && errors[Fields.Email]) && (
            <FormControl.Error>{errors[Fields.Email]}</FormControl.Error>
          )}
        </FormControl>

        <TextField
          name={Fields.PhoneNumber}
          onBlur={handleBlur}
          onChange={onChangeReshapedHandler}
          placeholder='Numero de Telefono'
          size="xlarge"
          value={values[Fields.PhoneNumber]}
        />

        <PasswordField
          name={Fields.CurrentPassword}
          onBlur={handleBlur}
          onChange={onChangeReshapedHandler}
          placeholder='Contraseña Actual'
          value={values[Fields.CurrentPassword]}
        />

        <FormControl
          hasError={
            !!(
              touched[Fields.NewPassword] &&
              touched[Fields.NewPasswordConfirm] &&
              errors[Fields.NewPassword]
            )
          }
        >
          <PasswordField
            name={Fields.NewPassword}
            onBlur={handleBlur}
            onChange={onChangeReshapedHandler}
            placeholder='Nueva Contraseña'
            value={values[Fields.NewPassword]}
          />

          {!!(
            touched[Fields.NewPassword] &&
            touched[Fields.NewPasswordConfirm] &&
            errors[Fields.NewPassword]
          ) && (
            <FormControl.Error>{errors[Fields.NewPassword]}</FormControl.Error>
          )}
        </FormControl>

        <FormControl
          hasError={
            !!(
              touched[Fields.NewPassword] &&
              touched[Fields.NewPasswordConfirm] &&
              errors[Fields.NewPasswordConfirm]
            )
          }
        >
          <PasswordField
            name={Fields.NewPasswordConfirm}
            onBlur={handleBlur}
            onChange={onChangeReshapedHandler}
            placeholder='Confirme Contraseña'
            value={values[Fields.NewPasswordConfirm]}
          />

          {!!(
            touched[Fields.NewPassword] &&
            touched[Fields.NewPasswordConfirm] &&
            errors[Fields.NewPasswordConfirm]
          ) && (
            <FormControl.Error>
              {errors[Fields.NewPasswordConfirm]}
            </FormControl.Error>
          )}
        </FormControl>
      </DrawerContent>

      <DrawerFooter>
        <Button
          color="primary"
          disabled={disabled}
          fullWidth
          onClick={onSubmitHandler}
          size="xlarge"
        >
          Guardar
        </Button>
      </DrawerFooter>
    </View>
  );
};
