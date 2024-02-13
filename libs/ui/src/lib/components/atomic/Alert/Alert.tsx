import React from 'react';
import type { AlertProps } from 'reshaped';
import { Alert as ReshapedAlert } from 'reshaped';

const Alert = (props: AlertProps) => {
  return <ReshapedAlert {...props}>{props.children}</ReshapedAlert>;
};
export default Alert;
