import { Button, Text, View } from '../../../../atomic';
import { PageEmptyProps } from './PageEmpty.types';
import { IconCart2 } from '../../../../../icons';
import { TranslationFunction, useTranslation } from '../../../../../hooks';

const PageEmpty = (props: PageEmptyProps) => {
  const translate: TranslationFunction = useTranslation();

  return (
    <View direction="row" gap={9}>
      <View.Item columns={12}>
        <View gap={2}>
          <View.Item columns={12}>
            <Text variant="body-2" weight='medium'>{translate('empty.text.noPrevious', props.nameSpace)}</Text>
            <Text variant="body-3">{translate('empty.text.change', props.nameSpace)}</Text>
          </View.Item>
        </View>
      </View.Item>

      <View.Item columns={12}>
        <Button icon={IconCart2} size="xlarge" color="primary">
          {translate('empty.button', props.nameSpace)}
        </Button>
      </View.Item>
      {props.showColumn && (
        <View.Item columns={12}>
          <View gap={1} direction="row">
            <View.Item>
              <Text variant='body-2' weight='bold'>{translate('empty.text.question', props.nameSpace)}</Text>
            </View.Item>
            <View.Item>
              <Text variant="body-3">{translate('empty.text.suggestion', props.nameSpace)}</Text>
            </View.Item>
          </View>
        </View.Item>
      )}
    </View>
  );
};

export default PageEmpty;
