import { AddressData, AppRoutes, communes, regions } from '@ducati/types';

import { IconPencil, IconThreeDotsVertical } from '../../../../../icons';
import {
  ActionBar,
  Avatar,
  Badge,
  Button,
  Card,
  Dismissible,
  DropdownMenu,
  Link,
  Loader,
  Modal,
  Text,
  View,
} from '../../../../atomic';
import type { AddressProps } from './Address.types';
import { useOpenState } from 'libs/ui/src/lib/hooks';
import { useState } from 'react';
import { useToggle } from 'reshaped';
import { Drawer, DrawerContent, DrawerHeader } from '../../utils';
import { AddressForm } from '../AddressForm';

export const Address = (props: AddressProps) => {
  const { address, canModify, isSelected, sendForm, deleteAddress } = props;
  const isDefaultShippingAddress = address.defaultShippingAddress;
  const firstNameInitial = (address?.firstName ?? '').charAt(0);
  const lastNameInitial = (address?.lastName ?? '').charAt(0);
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();
  const [isLoading, setIsLoading] = useState(false);
  const { active, activate, deactivate } = useToggle(false);
  const [city, setCity] = useState(regions.find(_r => _r.uid === address.region?.name)?.name);
  const [getCommunes, setGetCommunes] = useState(communes.find(_c => _c.uid === address.communes?.name)?.name);

  const addressFormData: AddressData = {
    id: address.id!,
    key: address.key ? address.key : '',
    firstName: address.firstName,
    lastName: address.lastName,
    state: address.state,
    streetName: address.streetName,
    phone: address.phone,
    region: address.region,
    postalCode: address.postalCode,
    email: address.email,
    communes: address.communes,
    defaultShippingAddress: address.defaultShippingAddress ?? false,
  };
  const removeAddress = async () => {
    setIsLoading(true);

    try {
      deleteAddress && deleteAddress(address.id!);
    } catch (error) {
      console.error('Error al eliminar la direccion:', error);
    } finally {
      setIsLoading(false);
      deactivate();
    }
  };
  return (
    <>
      <Card padding={0} selected={isSelected}>
        <View
          direction="row"
          padding={6}
          backgroundColor={isDefaultShippingAddress ? 'primary-faded' : 'white'}
        >
          <View.Item columns={12}>
            <View direction="row" gap={8}>
              <View.Item columns={12}>
                <View direction="row">
                  <View.Item columns={1}>
                    <Avatar
                      initials={firstNameInitial + lastNameInitial}
                      color="primary"
                      variant={isDefaultShippingAddress ? undefined : 'faded'}
                      squared
                    />
                  </View.Item>
                  <View.Item columns={11}>
                    <View direction="row" gap={3} align="end" justify="end">
                      {!isLoading ? (
                        <DropdownMenu>
                          <DropdownMenu.Trigger>
                            {(attributes) => (
                              <Button
                                color="black"
                                variant="ghost"
                                endIcon={IconThreeDotsVertical}
                                attributes={attributes}
                              />
                            )}
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content>
                            <DropdownMenu.Item onClick={onOpenDrawerHandler}>
                              Editar
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={activate}>
                              Eliminar
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu>
                      ) : (
                        <Loader />
                      )}
                      <Modal
                        active={active}
                        onClose={deactivate}
                        size={{
                          s: 'auto',
                          m: '600px',
                        }}
                      >
                        <Dismissible
                          onClose={deactivate}
                          closeAriaLabel="Close modal"
                        >
                          <View
                            paddingBottom={5}
                            justify="center"
                            align="center"
                          >
                            <Modal.Title>
                              Estas seguro que desea eliminar
                            </Modal.Title>
                          </View>
                          <ActionBar>
                            <View align="center">
                              <View>
                                <Text variant="body-2" weight="bold">
                                  {address.firstName} {address.lastName}
                                </Text>
                              </View>
                              <Text variant="body-3">
                                {address.streetNumber} {address.streetName}{' '}
                                {address?.line1} {address?.line2}
                              </Text>
                              <Text variant="body-3">
                                {city},{' '}
                                {getCommunes},{' '}
                                {address.state?.isocode} {address.postalCode}
                              </Text>
                            </View>
                            <View
                              gap={8}
                              paddingTop={5}
                              direction="row"
                              justify="center"
                            >
                              <View.Item>
                                <Button
                                  color="critical"
                                  onClick={removeAddress}
                                >
                                  Si, eliminar esta direccion
                                </Button>
                              </View.Item>
                              <View.Item>
                                <Button onClick={deactivate}>
                                  Cancelar
                                </Button>
                              </View.Item>
                            </View>
                          </ActionBar>
                        </Dismissible>
                      </Modal>
                    </View>
                  </View.Item>
                </View>
              </View.Item>

              <View.Item columns={12}>
                <View direction="row" gap={1} align="start" justify="start">
                  <View.Item columns={12}>
                    <View direction="column" gap={1} height={23}>
                      {isDefaultShippingAddress && (
                        <View paddingBottom={1}>
                          <Badge color="primary" variant="outline">
                            Por Defecto
                          </Badge>
                        </View>
                      )}
                      <View>
                        <Text variant="body-2" weight="bold">
                          {address.firstName} {address.lastName}
                        </Text>
                      </View>
                      <Text variant="body-3">
                        {address.streetNumber} {address.streetName}{' '}
                        {address?.line1} {address?.line2}
                      </Text>
                      <Text variant="body-3">
                        {city},{' '}
                      </Text>
                      <Text variant="body-3">
                        {getCommunes},{' '}
                        {address.state?.isocode}{' '}
                        {address.postalCode}
                      </Text>
                    </View>
                  </View.Item>
                  {!isDefaultShippingAddress && canModify ? (
                    <form method="POST">
                      <input type="hidden" name="_action" value="SET_DEFAULT" />
                      <input
                        type="hidden"
                        name="code"
                        value={address.id}
                        readOnly
                      />
                      <View.Item columns={12}>
                        <Link type="submit" href={AppRoutes.Home}>
                          Seleccionar por Defecto
                        </Link>
                      </View.Item>
                    </form>
                  ) : (
                    <View paddingTop={4} />
                  )}
                </View>
              </View.Item>
            </View>
          </View.Item>
        </View>
      </Card>
      <Drawer active={open} onClose={onCloseDrawerHandler}>
        <DrawerHeader
          title='Editar'
          onClose={onCloseDrawerHandler}
        />
        <DrawerContent padding={0}>
          {' '}
          <AddressForm
            initialValues={addressFormData}
            sendForm={sendForm}
          />
        </DrawerContent>
      </Drawer>
    </>

  );
};
