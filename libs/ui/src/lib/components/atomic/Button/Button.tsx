import React, { useContext } from 'react';
import type { ButtonProps as RSButtonProps } from 'reshaped';
import { Button as ReshapedButton } from 'reshaped';

import type { RenderProps } from '../../../types/RenderProps.types';
import { RenderContext } from '../../../context';

export interface ButtonProps extends RSButtonProps, RenderProps {
  buttonText?: string;
}

const Button = (props: ButtonProps) => {
  const { simpleText } = useContext(RenderContext);
  const inText = props.buttonText ?? props.children?.toString() ?? '';
  const out = props.renderId
    ? simpleText(inText, props.renderId)
    : props.children;

  return <ReshapedButton {...props}>{out}</ReshapedButton>;
};
Button.Aligner = ReshapedButton.Aligner;
export default Button;
