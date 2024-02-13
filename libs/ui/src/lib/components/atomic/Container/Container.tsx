import React from 'react';
import type { ContainerProps } from 'reshaped';
import { Container as ReshapedContainer } from 'reshaped';

const Container = (props: ContainerProps) => {
  return <ReshapedContainer {...props}>{props.children}</ReshapedContainer>;
};
export default Container;
