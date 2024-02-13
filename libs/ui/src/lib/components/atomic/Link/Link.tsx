import React from 'react';
import type { LinkProps } from 'reshaped';
import { Link as ReshapedLink } from 'reshaped';

const Link = (props: LinkProps) => {
  return <ReshapedLink {...props}>{props.children}</ReshapedLink>;
};
export default Link;
