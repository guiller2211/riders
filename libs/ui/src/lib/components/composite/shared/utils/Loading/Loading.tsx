import { Loader, Text, View } from '../../../../atomic';
import { LoadingProps } from './Loading.types';
import { TranslationFunction, useTranslation } from '../../../../../hooks';

const Loading = (props: LoadingProps) => {
  const translate: TranslationFunction = useTranslation();

  const size = getLoadingSize(props.size);
  return (
    <View {...props.view}>
      <Loader
        attributes={{
          'aria-label': props.ariaLabel ? translate(props.ariaLabel) : '',
          style: {
            width: size,
            height: size,
          },
        }}
      />
      {props.text && (
        <View paddingBlock={4} paddingInline={0}>
          <Text {...props.text}>{translate(props.text.message)}</Text>
        </View>
      )}
    </View>
  );
};
export default Loading;

const getLoadingSize = (size?: string) => {
  switch (size) {
    case 'small': {
      return 'var(--rs-unit-x5)';
    }
    case 'medium': {
      return 'var(--rs-unit-x10)';
    }
    case 'large': {
      return 'calc(2 * var(--rs-unit-x5))';
    }
    case 'xlarge': {
      return 'calc(2 * var(--rs-unit-x10))';
    }
    default:
      return 'var(--rs-unit-x10)';
  }
};
