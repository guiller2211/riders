import { useResponsiveClientValue } from '../../../../../hooks';
import { Button, Card, Hidden, Image, Text, View } from '../../../../atomic';
import type { ErrorHandlerProps } from './ErrorHandler.types';

const ErrorHandler = (props: ErrorHandlerProps) => {
  const { button, description, error, heading, image, showTechnicalError } =
    props;

  return (
    <View
      direction={useResponsiveClientValue({ s: 'column', l: 'row' })}
      gap={useResponsiveClientValue({ s: 6, l: 5 })}
      padding={6}
    >
      <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
        <View align={useResponsiveClientValue({ s: 'center', m: 'start' })}>
          <Image borderRadius='large' src={image?.desktop?.src} />
        </View>
      </View.Item>

      <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
        <View
          direction="column"
          gap={5}
          backgroundColor='white'
          paddingInline={20}
          paddingBlock={10}
          borderRadius='large'
        >
          {heading && (
            <Text
              variant="featured-1"
              weight="bold"
              align={useResponsiveClientValue({ s: 'center', m: 'start' })}
            >
              {heading}
            </Text>
          )}
          {description && (
            <Text
              variant="featured-3"
              align={useResponsiveClientValue({ s: 'center', m: 'start' })}
            >
              {description}
            </Text>
          )}
          {showTechnicalError && error?.message && (
            <Card>
              <View gap={1} direction="row">
                <View.Item columns={12}>
                  <Text
                    variant="body-3"
                    align="start"
                    attributes={{
                      style: {
                        fontWeight: 'var(--rs-font-weight-bold)',
                      },
                    }}
                  >
                    {error?.status?.toString()}
                  </Text>
                </View.Item>

                <View.Item columns={12}>
                  <Text variant="body-3" align="start">
                    {error.message}
                  </Text>
                </View.Item>
              </View>
            </Card>
          )}
          {button && (
            <Button size="large" color="primary" href="/">
              {button}
            </Button>
          )}
        </View>
      </View.Item>
    </View>
  );
};
export default ErrorHandler;
