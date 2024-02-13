import React from 'react';
import type { TextAreaProps } from 'reshaped';
import { TextArea as ReshapedTextArea } from 'reshaped';

const TextArea = (props: TextAreaProps) => {
  return <ReshapedTextArea {...props} />;
};
export default TextArea;
