import React from 'react';
import type { HiddenVisuallyProps } from 'reshaped';
import { HiddenVisually as ReshapedHiddenVisually } from 'reshaped';

const HiddenVisually = (props: HiddenVisuallyProps) => {
  return <ReshapedHiddenVisually {...props} />;
};
export default HiddenVisually;
