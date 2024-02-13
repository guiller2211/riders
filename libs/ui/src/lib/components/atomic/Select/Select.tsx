import React from 'react';
import type { SelectProps } from 'reshaped';
import { Select as ReshapedSelect } from 'reshaped';

const Select = (props: SelectProps) => {
  return <ReshapedSelect {...props} />;
};
export default Select;
