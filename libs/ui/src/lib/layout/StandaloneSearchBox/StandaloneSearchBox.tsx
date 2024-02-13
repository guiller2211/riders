import { Autocomplete } from 'reshaped';
import { View, Icon } from '../../components';
import { IconSearch } from '../../icons';

export const StandaloneSearchBox = () => {
  return (
    <View width="500px" maxWidth="100%">
      <Autocomplete
        name="product-search"
        size="xlarge"
        variant="outline"
        startSlot={<Icon size={10} svg={IconSearch} color="disabled" />}
      >
        <Autocomplete.Item value="1">example</Autocomplete.Item>
      </Autocomplete>
    </View>
  );
};
