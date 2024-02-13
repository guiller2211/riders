import React from 'react';

import { Example } from '../Example';
import { Button, MenuItem, Card, View } from '..';
import Theme from '.';
import { useTheme } from '../../../hooks';

export default { title: 'Utilities/ThemeProvider' };

const UncontrolledDemo = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      color="primary"
      onClick={() => setTheme(theme === 'base' ? 'fake' : 'base')}
    >
      Toggle theme
    </Button>
  );
};
export const uncontrolled = () => {
  return (
    <Example>
      <Example.Item title="switches theme using useTheme hooks">
        <UncontrolledDemo />
      </Example.Item>
    </Example>
  );
};
const Demo = () => {
  const { invertColorMode } = useTheme();
  return (
    <View gap={3}>
      <Button onClick={invertColorMode}>Invert mode</Button>

      <MenuItem selected>Test transition</MenuItem>

      <Card>Default card</Card>

      <Theme colorMode="inverted">
        <Card>Inverted card</Card>
      </Theme>
    </View>
  );
};
export const edgeCases = () => (
  <Example>
    <Example.Item title="should have no transitions while switching color mode">
      <Demo />
    </Example.Item>
  </Example>
);
