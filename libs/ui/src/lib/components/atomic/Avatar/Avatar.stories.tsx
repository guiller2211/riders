import React from 'react';

import { IconLightningChargeFill } from '../../../icons';
import { Example } from '../Example';
import { View } from '..';
import Avatar from './Avatar';

export default { title: 'Components/Avatar' };

export const content = () => (
  <Example>
    <Example.Item title="With image">
      <Avatar
        src="https://pbs.twimg.com/profile_images/1096029593335676929/OZbE9ZXV_400x400.png"
        alt="Smith Commerce"
      />
    </Example.Item>
    <Example.Item title="With initials">
      <Avatar initials="RS" />
    </Example.Item>
    <Example.Item title="With icon">
      <Avatar icon={IconLightningChargeFill} />
    </Example.Item>
  </Example>
);
export const size = () => (
  <Example>
    <Example.Item title="size: 6">
      <View direction="row" gap={3}>
        <Avatar size={6} icon={IconLightningChargeFill} />
        <Avatar size={6} initials="RS" squared />
      </View>
    </Example.Item>

    <Example.Item title="size: 15">
      <View direction="row" gap={3}>
        <Avatar size={15} icon={IconLightningChargeFill} />
        <Avatar size={15} initials="RS" squared />
      </View>
    </Example.Item>

    <Example.Item title="size: 40">
      <View direction="row" gap={3}>
        <Avatar size={40} icon={IconLightningChargeFill} />
        <Avatar size={40} initials="RS" squared />
      </View>
    </Example.Item>

    <Example.Item title={['responsive size', '[s] 10', '[m+] 20']}>
      <View direction="row" gap={3}>
        <Avatar size={{ s: 10, m: 20 }} icon={IconLightningChargeFill} />
        <Avatar
          size={{ s: 10, m: 20 }}
          icon={IconLightningChargeFill}
          squared
        />
      </View>
    </Example.Item>
  </Example>
);
export const squared = () => (
  <Example>
    <Example.Item title="squared, with image">
      <Avatar
        squared
        src="https://pbs.twimg.com/profile_images/1096029593335676929/OZbE9ZXV_400x400.png"
      />
    </Example.Item>
    <Example.Item title="squared, with initials">
      <Avatar squared initials="RS" />
    </Example.Item>
    <Example.Item title="squared, with initials">
      <Avatar squared icon={IconLightningChargeFill} />
    </Example.Item>
  </Example>
);
export const colors = () => (
  <Example>
    <Example.Item title="color: neutral">
      <Avatar color="neutral" icon={IconLightningChargeFill} />
    </Example.Item>
    <Example.Item title="color: neutral, variant: faded">
      <Avatar color="neutral" variant="faded" icon={IconLightningChargeFill} />
    </Example.Item>
    <Example.Item title="color: primary">
      <Avatar color="primary" icon={IconLightningChargeFill} />
    </Example.Item>
    <Example.Item title="color: primary, variant: faded">
      <Avatar color="primary" variant="faded" icon={IconLightningChargeFill} />
    </Example.Item>
    <Example.Item title="color: positive">
      <Avatar color="positive" icon={IconLightningChargeFill} />
    </Example.Item>
    <Example.Item title="color: positive, variant: faded">
      <Avatar color="positive" variant="faded" icon={IconLightningChargeFill} />
    </Example.Item>
    <Example.Item title="color: critical">
      <Avatar color="critical" icon={IconLightningChargeFill} />
    </Example.Item>
    <Example.Item title="color: critical, variant: faded">
      <Avatar color="critical" variant="faded" icon={IconLightningChargeFill} />
    </Example.Item>
  </Example>
);
