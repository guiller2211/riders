import React from 'react';

import { IconLightningChargeFill } from '../../../icons';
import { Example } from '../Example';
import { Link } from '..';
import Alert from './Alert';

export default { title: 'Components/Alert' };

export const color = () => (
  <Example>
    <Example.Item title="color: neutral">
      <Alert
        title="Alert title goes here"
        icon={IconLightningChargeFill}
        actionsSlot={
          <>
            <Link variant="plain">View now</Link>
            <Link variant="plain">Dismiss</Link>
          </>
        }
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard
      </Alert>
    </Example.Item>

    <Example.Item title="color: primary">
      <Alert
        color="primary"
        title="Alert title goes here"
        icon={IconLightningChargeFill}
        actionsSlot={
          <>
            <Link variant="plain">View now</Link>
            <Link variant="plain">Dismiss</Link>
          </>
        }
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard
      </Alert>
    </Example.Item>

    <Example.Item title="color: critical">
      <Alert
        color="critical"
        title="Alert title goes here"
        icon={IconLightningChargeFill}
        actionsSlot={
          <>
            <Link variant="plain" color="critical">
              View now
            </Link>
            <Link variant="plain" color="critical">
              Dismiss
            </Link>
          </>
        }
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard
      </Alert>
    </Example.Item>

    <Example.Item title="color: positive">
      <Alert
        color="positive"
        title="Alert title goes here"
        icon={IconLightningChargeFill}
        actionsSlot={
          <>
            <Link variant="plain" color="positive">
              View now
            </Link>
            <Link variant="plain" color="positive">
              Dismiss
            </Link>
          </>
        }
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard
      </Alert>
    </Example.Item>
  </Example>
);
export const inline = () => (
  <Example>
    <Example.Item title="inline: true">
      <Alert
        inline
        title="Alert title goes here"
        icon={IconLightningChargeFill}
        actionsSlot={
          <>
            <Link variant="plain">View now</Link>
            <Link variant="plain">Dismiss</Link>
          </>
        }
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard
      </Alert>
    </Example.Item>
  </Example>
);
export const bleed = () => (
  <Example>
    <Example.Item title="bleed: 4">
      <Alert bleed={4} icon={IconLightningChargeFill}>
        Content
      </Alert>
    </Example.Item>
    <Example.Item title={['responsive bleed', '[s] 4', '[m+] 0']}>
      <Alert bleed={{ s: 4, m: 0 }} icon={IconLightningChargeFill}>
        Content
      </Alert>
    </Example.Item>
  </Example>
);
