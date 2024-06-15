import { Link, Image, View } from '../../components/atomic';
import useResponsiveClientValue from '../../hooks/useResponsiveClientValue';
import type { HeaderLogoProps } from './HeaderLogo.types';

export const HeaderLogo = (props: HeaderLogoProps) => {
  const { image, link } = props;
  return (
    <View align="center">
      <Link href={link?.href}>
        <Image src={useResponsiveClientValue({s:image?.mobile?.src , l:image?.desktop?.src})} />
      </Link>
    </View>
  );
};
