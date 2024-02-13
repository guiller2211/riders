import '../../themes/default/base.module.css';

import {
  Button,
  Dismissible,
  Hidden,
  Modal,
  View,
} from '../../components/atomic';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderUser } from '../HeaderUser';
import { HeaderCart } from '../HeaderCart';
import type { HeaderProps } from './Header.types';
import { HeaderAdditionalBar } from '../HeaderAdditionalBar';
import { useResponsiveClientValue, useToggle } from '../../hooks';
import { IconList } from '../../icons';

export const Header = (props: HeaderProps) => {
  const { navigation, logo } = props;
  const { activate, deactivate, active } = useToggle(false);
  return (
    <View
      as="header"
      padding={5}
      direction="row"
      gap={10}
      backgroundColor="black"
      align="center"
      justify="center"
    >
      <HeaderLogo image={logo?.image} link={logo?.link} />
      {/* <Hidden hide={useResponsiveClientValue({ s: true, m: false, l: false })}> */}
        <HeaderAdditionalBar navigation={navigation} />

        <View.Item>
          <View direction="row">
            <HeaderUser />
            <HeaderCart />
          </View>
        </View.Item>
      {/* </Hidden> */}
    {/*   <Hidden hide={useResponsiveClientValue({ s: false, l: true })}>
        <Button
          color="primary"
          variant="ghost"
          size="large"
          endIcon={IconList}
          onClick={activate}
        />
        <Modal
          active={active}
          onClose={deactivate}
          position={useResponsiveClientValue({ s: 'bottom', m: 'end' })}
        >
          <Dismissible onClose={deactivate} closeAriaLabel="Close modal">
            <Modal.Title>Modal title</Modal.Title>
            <Modal.Subtitle>Modal subtitle</Modal.Subtitle>
          </Dismissible>
        </Modal>
      </Hidden> */}
    </View>
  );
};
