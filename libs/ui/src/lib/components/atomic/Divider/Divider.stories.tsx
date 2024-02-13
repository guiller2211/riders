import React from 'react';
import { Placeholder } from 'reshaped';

import { Example } from '../Example';
import { View } from '..';
import Divider from '.';

export default { title: 'Components/Divider' };

export const rendering = () => (
  <Example>
    <Example.Item title="default rendering">
      <Divider />
    </Example.Item>

    <Example.Item
      title={['blank rendering', 'box should overlap with divider']}
    >
      <View width="40px" height="10px" backgroundColor="primary" />
      <Divider blank />
    </Example.Item>
  </Example>
);
export const vertical = () => (
  <Example>
    <Example.Item title="vertical">
      <View gap={3} direction="row" align="stretch">
        <Placeholder />
        <View.Item>
          <Divider vertical />
        </View.Item>
        <Placeholder />
      </View>
    </Example.Item>

    <Example.Item title={['responsive vertical', '[s] true', '[m+]: false']}>
      <View gap={3} direction={{ s: 'row', m: 'column' }} align="stretch">
        <Placeholder />
        <View.Item>
          <Divider vertical={{ s: true, m: false }} />
        </View.Item>
        <Placeholder />
      </View>
    </Example.Item>
  </Example>
);
