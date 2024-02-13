import React from 'react';

import { Example } from '../Example';
import { View, Checkbox } from '..';
import CheckboxGroup from './CheckboxGroup';

export default { title: 'Components/CheckboxGroup' };

export const selection = () => (
  <Example>
    <Example.Item title="unselected">
      <CheckboxGroup name="animal">
        <View gap={3}>
          <Checkbox value="dog">Checkbox 1</Checkbox>
          <Checkbox value="cat">Checkbox 2</Checkbox>
        </View>
      </CheckboxGroup>
    </Example.Item>

    <Example.Item title="checked, uncontrolled">
      <CheckboxGroup name="animal" defaultValue={['dog']}>
        <View gap={3}>
          <Checkbox value="dog">Checkbox 1</Checkbox>
          <Checkbox value="cat">Checkbox 2</Checkbox>
        </View>
      </CheckboxGroup>
    </Example.Item>

    <Example.Item title="checked, controlled">
      <CheckboxGroup name="animal" value={['dog']}>
        <View gap={3}>
          <Checkbox value="dog">Checkbox 1</Checkbox>
          <Checkbox value="cat">Checkbox 2</Checkbox>
        </View>
      </CheckboxGroup>
    </Example.Item>
  </Example>
);
export const disabled = () => (
  <Example>
    <Example.Item title="disabled">
      <CheckboxGroup name="animal" disabled>
        <View gap={3}>
          <Checkbox value="dog">Dog</Checkbox>
          <Checkbox value="cat">Cat</Checkbox>
        </View>
      </CheckboxGroup>
    </Example.Item>
  </Example>
);
