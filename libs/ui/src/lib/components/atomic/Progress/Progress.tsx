import React from 'react';
import type { ProgressProps } from 'reshaped';
import { Progress as ReshapedProgress } from 'reshaped';

const Progress = (props: ProgressProps) => {
  return <ReshapedProgress {...props} />;
};
export default Progress;
