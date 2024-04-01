import { Button, Card, Hidden, Image, Text, View } from '../../../../atomic';
import type { ErrorHandlerProps } from './ErrorHandler.types';

const ErrorHandler = (props: ErrorHandlerProps) => {
  const { button, description, error, heading, image, showTechnicalError } =
    props;

  return (
    <View align="center">
      <View width={{ l: 324, s: '100%' }}>
        <View
          direction={{ s: 'column', l: 'row' }}
          gap={{ s: 6, m: 34 }}
          paddingTop={12}
          paddingStart={{ l: 0, s: 6 }}
          paddingEnd={{ l: 0, s: 6 }}
        >
          <View.Item columns={{ s: 12, l: 6 }}>
            <View align={{ s: 'center', m: 'start' }}>
              <Hidden hide={{ s: true, l: false }}>
                <Image src={image?.desktop?.src} />
              </Hidden>
              <Hidden hide={{ s: false, l: true }}>
                <Image src={image?.mobile?.src} />
              </Hidden>
            </View>
          </View.Item>

          <View.Item columns={{ s: 12, l: 6 }}>
            <View
              direction="row"
              gap={1}
              paddingTop={{ s: 0, m: 36 }}
              align={{ s: 'center', m: 'start' }}
            >
              {heading && (
                <View.Item columns={12}>
                  <Text
                    variant="featured-1"
                    weight="bold"
                    align={{ s: 'center', m: 'start' }}
                  >
                    heading
                  </Text>
                </View.Item>
              )}
              {description && (
                <View.Item columns={12}>
                  <View>
                    <Text
                      variant="featured-3"
                      align={{ s: 'center', m: 'start' }}
                    >
                      {description}
                    </Text>
                  </View>
                </View.Item>
              )}
              {showTechnicalError && error?.message && (
                <View.Item columns={12}>
                  <View paddingTop={{ s: 7, l: 2 }}>
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
                  </View>
                </View.Item>
              )}
              {button && (
                <View.Item columns={12}>
                  <View paddingTop={7} align={{ s: 'center', m: 'start' }}>
                    <Button size="large" color="primary" href="/">
                      {button}
                    </Button>
                  </View>
                </View.Item>
              )}
            </View>
          </View.Item>
        </View>
      </View>
    </View>
  );
};
export default ErrorHandler;
