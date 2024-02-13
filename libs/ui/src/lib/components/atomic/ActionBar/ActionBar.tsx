import React from 'react';
import type { ActionBarProps } from 'reshaped';
import { ActionBar as ReshapedActionBar } from 'reshaped';

const ActionBar = (props: ActionBarProps) => {
  return <ReshapedActionBar {...props} />;
};
export default ActionBar;
