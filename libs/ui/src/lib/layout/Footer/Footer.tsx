import { AppRoutes, type FooterData } from '@riders/types';


import { Button, Text, Divider, View, Link } from '../../components/atomic';
import SocialNetworkIcons from '../../icons/Misc/SocialNetworkIcons';
import FooterLinkBlock from '../FooterLinkBlock';
import { useResponsiveClientValue } from '../../hooks';
import { useIsMobile } from '../../utils';

export const Footer = (props: FooterData) => {
  const isMobile = useIsMobile();

  return (
    <View
      backgroundColor="page-faded"
      align="center"
      paddingTop={useResponsiveClientValue({ l: 16, s: 12 })}
      paddingStart={useResponsiveClientValue({ s: 6 })}
      paddingEnd={useResponsiveClientValue({ s: 6 })}
    >
      <View
        gap={0}
        width={isMobile ? 324 : '100%'}
        direction="row"
        align={useResponsiveClientValue({ s: 'center' })}
      >
        <View.Item columns={12}>
          <View direction="row" gap={useResponsiveClientValue({ l: 24, s: 18 })} paddingBottom={8}>
            <View.Item columns={useResponsiveClientValue({ l: 8, s: 12 })}>
              <View gap={useResponsiveClientValue({ l: 6, s: 12 })} direction="row">
                {props.linkBlocks?.map((linkBlock, index) => {
                  return <FooterLinkBlock {...linkBlock} key={index} />;
                })}
              </View>
            </View.Item>

            <View.Item columns={useResponsiveClientValue({ l: 4, s: 12 })}>
              <View align={{ l: 'start', s: 'center' }}>
                <Text variant="body-2" weight="bold">
                  {props.aboutHeading}
                </Text>

                <View paddingTop={4}>
                  <Text variant="body-3" color="neutral-faded">
                    {props.aboutMessage}
                  </Text>
                </View>
                <View paddingTop={8}>
                  <Button elevated color="white" href={AppRoutes.Contacts}>
                    <Text variant="featured-3" weight="bold">
                      Deja un comentario
                    </Text>
                  </Button>
                </View>
              </View>
            </View.Item>
          </View>
        </View.Item>
        <View.Item columns={12}>
          <View direction="row" paddingTop={useResponsiveClientValue({ l: 6, s: 14 })} align="center">
            <View.Item columns={useResponsiveClientValue({ l: 6, s: 12 })}>
              <View
                direction="row"
                align="center"
                justify={useResponsiveClientValue({ l: 'end', s: 'center' })}
              >
                <SocialNetworkIcons {...props} />
              </View>
            </View.Item>
            <View.Item columns={12}>
              <View paddingTop={useResponsiveClientValue({ s: 6, l: 8 })}>
                <Divider />
              </View>
            </View.Item>

            <View.Item columns={12}>
              <View direction="row" gap={6} paddingTop={8} paddingBottom={8}>
                <View.Item columns={useResponsiveClientValue({ l: 5, s: 12 })}>
                  <Text variant="caption-1" align={useResponsiveClientValue({ s: 'center', l: 'start' })}>
                    {props.copyright}
                  </Text>
                </View.Item>

                <View.Item columns={useResponsiveClientValue({ l: 7, s: 12 })}>
                  <View
                    gap={6}
                    direction={useResponsiveClientValue({ s: 'row' })}
                    align="center"
                    justify="end"
                  >
                    {props.links?.map((link, index) => {
                      return (
                        <View.Item key={index} columns={isMobile ? 12 : 'auto'}>
                          <Link href={link.url} variant="plain">
                            <Text
                              variant="caption-1"
                              color="neutral-faded"
                              align={{ s: 'center', l: 'start' }}
                            >
                              {link.text}
                            </Text>
                          </Link>
                        </View.Item>
                      );
                    })}
                  </View>
                </View.Item>
              </View>
            </View.Item>
          </View>
        </View.Item>
      </View>
    </View>
  );
};
