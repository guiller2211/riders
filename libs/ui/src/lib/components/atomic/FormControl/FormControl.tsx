import React from 'react';
import type { FormControlProps } from 'reshaped';
import { FormControl as ReshapedFormControl } from 'reshaped';

const FormControl = (props: FormControlProps) => {
  return <ReshapedFormControl {...props} />;
};

FormControl.Label = ReshapedFormControl.Label;
FormControl.Helper = ReshapedFormControl.Helper;
FormControl.Error = ReshapedFormControl.Error;
export default FormControl;
