import React from 'react';
import type { BadgeProps } from 'reshaped';
import { Badge as ReshapedBadge } from 'reshaped';

const Badge = (props: BadgeProps) => {
  return <ReshapedBadge {...props}>{props.children}</ReshapedBadge>;
};

Badge.Container = ReshapedBadge.Container;
export default Badge;
