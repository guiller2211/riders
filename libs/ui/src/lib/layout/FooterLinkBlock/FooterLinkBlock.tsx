import type { LinkBlockData } from '@riders/types';

import { Link, Text, View } from '../../components/atomic';
import { useResponsiveClientValue } from '../../hooks';

const FooterLinkBlock = (props: LinkBlockData) => {
  return (
    <View.Item columns={useResponsiveClientValue({ l: 3, s: 12 })}>
      <Text variant="body-2" weight="bold" align={useResponsiveClientValue({ s: 'center', l: 'start' })}>
        {props.heading}
      </Text>

      <View paddingTop={4}>
        <View gap={4} direction="column" align={useResponsiveClientValue({ l: 'start', s: 'center' })}>
          {props.links?.map((link, linkIndex) => {
            return (
              <Link key={linkIndex} href={link.url} variant="plain">
                <Text variant="body-3" color="neutral-faded">
                  {link.text}
                </Text>
              </Link>
            );
          })}
        </View>
      </View>
    </View.Item>
  );
};
export default FooterLinkBlock;
