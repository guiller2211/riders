import React from 'react';
import type { HotkeyProps } from 'reshaped';
import { Hotkey as ReshapedHotkey } from 'reshaped';

const Hotkey = (props: HotkeyProps) => {
  return <ReshapedHotkey {...props} />;
};
export default Hotkey;
