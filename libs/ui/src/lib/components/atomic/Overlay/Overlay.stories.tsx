/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { Example } from '../Example';
import Overlay from '.';
import { useToggle } from '../../../hooks';
import Button from '../Button';

export default { title: 'Components/Overlay' };

export const base = () => {
  const baseToggle = useToggle(true);
  const transparentToggle = useToggle(false);
  return (
    <Example>
      <Example.Item title="locks scroll">
        <Button onClick={() => baseToggle.activate()}>Open overlay</Button>
        <Overlay
          active={baseToggle.active}
          onClose={() => baseToggle.deactivate()}
        >
          Overlay content
        </Overlay>
        <div style={{ height: 1000 }} />
      </Example.Item>

      <Example.Item title="transparent, doesn't lock scroll">
        <Button onClick={() => transparentToggle.activate()}>
          Open overlay
        </Button>
        <Overlay
          active={transparentToggle.active}
          onClose={() => transparentToggle.deactivate()}
          transparent
        >
          Overlay content
        </Overlay>
        <div style={{ height: 1000 }} />
      </Example.Item>
    </Example>
  );
};
