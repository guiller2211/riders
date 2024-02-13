import { useHotkeys } from 'reshaped';

import { View, TextField } from '..';
import { Example } from '../Example';
import Hotkey from '.';

export default { title: 'Components/Hotkey' };
const Demo = () => {
  const { checkHotkeyState } = useHotkeys({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    'Meta+k': () => {},
  });
  return <Hotkey active={checkHotkeyState('k')}>⌘K</Hotkey>;
};
export const base = () => (
  <Example>
    <Example.Item title="Base">
      <Demo />
    </Example.Item>
    <Example.Item title="Active">
      <Hotkey active>⌘K</Hotkey>
    </Example.Item>
    <Example.Item title="Inside input slot">
      <View width="300px">
        <TextField
          name="hey"
          endSlot={<Demo />}
          inputAttributes={{ 'aria-label': 'hotkey test' }}
        />
      </View>
    </Example.Item>
  </Example>
);
