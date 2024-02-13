import React from 'react';
import type { AvatarProps } from 'reshaped';
import { Avatar as ReshapedAvatar } from 'reshaped';

const Avatar = (props: AvatarProps) => {
  return <ReshapedAvatar {...props} />;
};
export default Avatar;
