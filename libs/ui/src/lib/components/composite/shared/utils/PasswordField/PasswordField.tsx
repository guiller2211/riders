import { useState } from 'react';

import { Button, TextField } from '../../../../atomic';
import { IconEyeFill, IconEyeSlashFill } from '../../../../../icons';
import type { PasswordFieldProps } from './PasswordField.types';

export const PasswordField = (props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const onClickHandler = () => {
    setShowPassword(!showPassword);
  };
  const icon = showPassword ? IconEyeFill : IconEyeSlashFill;
  const type = showPassword ? 'text' : 'password';

  return (
    <TextField
      size="xlarge"
      inputAttributes={{
        autoComplete: 'current-password',
        type,
      }}
      endSlot={
        <Button
          variant="ghost"
          icon={icon}
          onClick={onClickHandler}
          size="large"
        />
      }
      {...props}
    />
  );
};
