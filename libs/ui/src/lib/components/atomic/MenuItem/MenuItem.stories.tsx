/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Placeholder } from 'reshaped';

import { IconLightningChargeFill } from '../../../icons';
import { Example } from '../Example';
import { Text, View } from '..';
import MenuItem from '.';

export default { title: 'Components/MenuItem' };

export const size = () => (
  <Example>
    <Example.Item title="size: small">
      <MenuItem size="small" icon={IconLightningChargeFill} onClick={() => {}}>
        Menu item
      </MenuItem>
    </Example.Item>
    <Example.Item title="size: medium">
      <MenuItem icon={IconLightningChargeFill} onClick={() => {}}>
        Menu item
      </MenuItem>
    </Example.Item>
    <Example.Item title="size: large">
      <MenuItem size="large" icon={IconLightningChargeFill} onClick={() => {}}>
        Menu item
      </MenuItem>
    </Example.Item>
    <Example.Item
      title={['responsive size', '[s] small', '[m] medium', '[l+] large']}
    >
      <MenuItem
        size={{ s: 'small', m: 'medium', l: 'large' }}
        icon={IconLightningChargeFill}
        onClick={() => {}}
      >
        Menu item
      </MenuItem>
    </Example.Item>
  </Example>
);
export const color = () => (
  <Example>
    <Example.Item title="color: neutral">
      <MenuItem color="neutral" icon={IconLightningChargeFill}>
        Menu item
      </MenuItem>
    </Example.Item>
    <Example.Item title="color: primary">
      <MenuItem color="primary" icon={IconLightningChargeFill}>
        Menu item
      </MenuItem>
    </Example.Item>
    <Example.Item title="color: critical">
      <MenuItem color="critical" icon={IconLightningChargeFill}>
        Menu item
      </MenuItem>
    </Example.Item>
  </Example>
);
export const selected = () => (
  <Example>
    <Example.Item title="selected, color: neutral">
      <MenuItem color="neutral" selected icon={IconLightningChargeFill}>
        Menu item
      </MenuItem>
    </Example.Item>
    <Example.Item title="selected, color: primary">
      <MenuItem color="primary" selected icon={IconLightningChargeFill}>
        Menu item
      </MenuItem>
    </Example.Item>
    <Example.Item title="selected, color: critical">
      <MenuItem color="critical" selected icon={IconLightningChargeFill}>
        Menu item
      </MenuItem>
    </Example.Item>
  </Example>
);
export const disabled = () => (
  <Example>
    <Example.Item title="disabled">
      <MenuItem disabled icon={IconLightningChargeFill}>
        Menu item
      </MenuItem>
    </Example.Item>
  </Example>
);
export const roundedCorners = () => (
  <Example>
    <Example.Item title="roundedCorners">
      <MenuItem roundedCorners selected icon={IconLightningChargeFill}>
        Menu item
      </MenuItem>
    </Example.Item>

    <Example.Item
      title={['responsive roundedCorners', '[s]: false', '[m+]: true']}
    >
      <MenuItem
        roundedCorners={{ s: false, m: true }}
        selected
        icon={IconLightningChargeFill}
      >
        Menu item
      </MenuItem>
    </Example.Item>
  </Example>
);
export const slots = () => (
  <Example>
    <Example.Item title="startSlot, endSlot, selected">
      <MenuItem
        startSlot={<Placeholder h={20} />}
        endSlot={<Placeholder h={20} />}
        selected
      >
        Menu item
      </MenuItem>
    </Example.Item>
  </Example>
);
export const aligner = () => (
  <Example>
    <Example.Item title="size: small">
      <View gap={2}>
        <Text variant="title-6">Heading</Text>
        <MenuItem.Aligner>
          <MenuItem size="small" selected>
            Menu item
          </MenuItem>
        </MenuItem.Aligner>
      </View>
    </Example.Item>

    <Example.Item title="size: medium">
      <View gap={2}>
        <Text variant="title-6">Heading</Text>
        <MenuItem.Aligner>
          <MenuItem selected>Menu item</MenuItem>
        </MenuItem.Aligner>
      </View>
    </Example.Item>

    <Example.Item title="size: large">
      <View gap={2}>
        <Text variant="title-6">Heading</Text>
        <MenuItem.Aligner>
          <MenuItem size="large" selected>
            Menu item
          </MenuItem>
        </MenuItem.Aligner>
      </View>
    </Example.Item>
  </Example>
);
