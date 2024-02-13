import React from 'react';
import type { SkeletonProps } from 'reshaped';
import { Skeleton as ReshapedSkeleton } from 'reshaped';

const Skeleton = (props: SkeletonProps) => {
  return <ReshapedSkeleton {...props} />;
};
export default Skeleton;
