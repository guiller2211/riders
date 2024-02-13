import React from 'react';

import { IconMic, IconLightningChargeFill } from '../../../icons';
import { Example } from '../Example';
import { View, Text, Icon } from '..';

export default { title: 'Utilities/Icon' };

export const size = () => (
  <Example>
    <Example.Item title="size: 4">
      <Icon svg={IconLightningChargeFill} size={4} />
    </Example.Item>
    <Example.Item title="size: 8">
      <Icon svg={IconLightningChargeFill} size={8} />
    </Example.Item>
    <Example.Item title="size: 100%">
      <View width={25} height={25}>
        <Icon svg={IconLightningChargeFill} size="100%" />
      </View>
    </Example.Item>
    <Example.Item title={['responsive size', '[s] 5', '[m]: 10']}>
      <Icon svg={IconLightningChargeFill} size={{ s: 5, m: 10 }} />
    </Example.Item>
    <Example.Item title="size: inherit from font">
      <Text variant="title-6">
        <View direction="row" align="center" gap={2}>
          <Icon svg={IconLightningChargeFill} />
          <View.Item>Reshaped</View.Item>
        </View>
      </Text>
    </Example.Item>
  </Example>
);
export const color = () => (
  <Example>
    <Example.Item title="color: neutral">
      <Icon svg={IconLightningChargeFill} color="neutral" />
    </Example.Item>
    <Example.Item title="color: neutral-faded">
      <Icon svg={IconLightningChargeFill} color="neutral-faded" />
    </Example.Item>
    <Example.Item title="color: primary">
      <Icon svg={IconLightningChargeFill} color="primary" />
    </Example.Item>
    <Example.Item title="color: critical">
      <Icon svg={IconLightningChargeFill} color="critical" />
    </Example.Item>
    <Example.Item title="color: positive">
      <Icon svg={IconLightningChargeFill} color="positive" />
    </Example.Item>
    <Example.Item title="color: disabled">
      <Icon svg={IconLightningChargeFill} color="disabled" />
    </Example.Item>
    <Example.Item title="color: inherit">
      <div style={{ color: 'tomato' }}>
        <Icon svg={IconLightningChargeFill} />
      </div>
    </Example.Item>
  </Example>
);
export const autoWidth = () => (
  <Example>
    <Example.Item title="square boundaries">
      <div
        style={{
          background: 'var(--rs-color-background-neutral)',
          display: 'inline-block',
        }}
      >
        <Icon svg={IconMic} size={10} />
      </div>
    </Example.Item>
    <Example.Item title="auto width boundaries">
      <div
        style={{
          background: 'var(--rs-color-background-neutral)',
          display: 'inline-block',
        }}
      >
        <Icon svg={IconMic} size={10} autoWidth />
      </div>
    </Example.Item>
  </Example>
);
