import {
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconWhatsApp,
  IconYoutube,
} from '../../../icons';
import { Icon, Link, View } from '../../../components';
import type { SocialNetworkIconProps } from './SocialNetworkIcons.types';

const SocialNetworkIcons = (props: SocialNetworkIconProps) => {
  return (
    <View gap={4} direction="row" align="center" justify="end">
      {props.youtubeLink && (
        <Link
          href={props.youtubeLink}
          variant="plain"
          attributes={{ 'aria-label': 'Youtube link' }}
        >
          <Icon svg={IconYoutube} size={5} color="neutral-faded" />
        </Link>
      )}
      {props.twitterLink && (
        <Link
          href={props.twitterLink}
          variant="plain"
          attributes={{ 'aria-label': 'Twitter link' }}
        >
          <Icon svg={IconTwitter} size={5} color="neutral-faded" />
        </Link>
      )}
      {props.facebookLink && (
        <Link
          href={props.facebookLink}
          variant="plain"
          attributes={{ 'aria-label': 'Facebook link' }}
        >
          <Icon svg={IconFacebook} size={5} color="neutral-faded" />
        </Link>
      )}
      {props.instagramLink && (
        <Link
          href={props.instagramLink}
          variant="plain"
          attributes={{ 'aria-label': 'Instagram link' }}
        >
          <Icon svg={IconInstagram} size={5} color="neutral-faded" />
        </Link>
      )}
      {props.whatsappLink && (
        <Link
          href={props.whatsappLink}
          variant="plain"
          attributes={{ 'aria-label': 'WhatsApp link' }}
        >
          <Icon svg={IconWhatsApp} size={5} color="neutral-faded" />
        </Link>
      )}
    </View>
  );
};

export default SocialNetworkIcons;
