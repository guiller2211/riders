import React from 'react';
import type { OverlayProps } from 'reshaped';
import { Overlay as ReshapedOverlay } from 'reshaped';

const Overlay = (props: OverlayProps) => {
  return <ReshapedOverlay {...props} />;
};
export default Overlay;
