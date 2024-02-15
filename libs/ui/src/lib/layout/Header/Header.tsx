import { Button, Dismissible, Hidden, Modal, View } from '../../components/atomic';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderUser } from '../HeaderUser';
import { HeaderCart } from '../HeaderCart';
import { HeaderAdditionalBar } from '../HeaderAdditionalBar';
import { IconList } from '../../icons';
import type { HeaderProps } from './Header.types';
import { useToggle } from '../../hooks';

export const Header = (props: HeaderProps) => {
  const { navigation, logo, className } = props;
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

      <HeaderAdditionalBar navigation={navigation} />
      <View.Item>
        <View direction="row">
          <HeaderUser />
          <HeaderCart />
        </View>
      </View.Item>

      {/*   <View className='mobile-screen'>
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
      </View> */}
    </View>
  );
};
