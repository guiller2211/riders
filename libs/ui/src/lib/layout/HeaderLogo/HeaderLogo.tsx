import { Link, Image, View } from '../../components/atomic';
import type { HeaderLogoProps } from './HeaderLogo.types';

export const HeaderLogo = (props: HeaderLogoProps) => {
  const { image, link } = props;
  return (
    <View align="center">
      <Link href={link?.href}>
        <Image width="100%" height='6rem' src={image?.desktop?.src} />
      </Link>
    </View>
  );
};
