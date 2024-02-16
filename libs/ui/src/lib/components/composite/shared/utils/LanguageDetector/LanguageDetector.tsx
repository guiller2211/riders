import { Button, DropdownMenu, Text } from '../../../../atomic';
import { IconChevronDown } from '../../../../../icons';
import { LanguageDetectorProps } from './LanguageDetector.types';

const LanguageDetector = (props: LanguageDetectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        {(attributes) => (
          <Button color="white" endIcon={IconChevronDown} attributes={attributes} elevated>
            <Text variant='body-3' weight='medium'>{props.locale}</Text>
          </Button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {props.languages?.map((lang, index) => {
          return (
            <DropdownMenu.Item key={index}
              disabled={lang === props.locale}
              onClick={() => props.changeLanguage(lang)}>
              <Text>{lang}</Text>
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
export default LanguageDetector;
