import React from 'react';
import type { LoaderProps } from 'reshaped';
import { Loader as ReshapedLoader } from 'reshaped';

const Loader = (props: LoaderProps) => {
  return <ReshapedLoader {...props} />;
};
export default Loader;
