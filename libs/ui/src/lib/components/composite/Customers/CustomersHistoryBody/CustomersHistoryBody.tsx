import { Fragment, useState } from 'react';
import { Avatar, Button, Tabs, Text, View } from '../../../atomic';
import { IconPerson } from '../../../../icons';
import { CustomersHistoryBodyProps } from './CustomersHistoryBody.types';
import { Drawer, DrawerContent, DrawerHeader } from '../../shared';
import { useOpenState } from '../../../../hooks/useOpenState';
import { Customer } from '@backoffice/types';
import { FormCustomer } from '../FormCustomer';

const renderField = (field: string, value: unknown) => {
  switch (field) {
    case 'id':
      return (
        <View.Item columns="auto" grow>
          <Text variant="caption-1">{`${value}`}</Text>
        </View.Item>)
    case 'firstName':
      return (
        <View.Item columns="auto" grow>
          <View direction="row" align="center" gap={2}>
            <View.Item>
              <Avatar icon={IconPerson} size={6} />
            </View.Item>
            <View.Item>
              <Text variant="caption-1">{`${value}`}</Text>
            </View.Item>
          </View>
        </View.Item>
      );
    case 'email':
      return (
        <View.Item columns="auto" grow>
          <Text variant="caption-1">{`${value}`}</Text>
        </View.Item>
      );
    default:
      return null;
  }
};

export const CustomersHistoryBody = (props: CustomersHistoryBodyProps) => {
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();
  const [data, setData] = useState<Customer | null>();
  const { users, searchTerm, sendForm } = props;
  const filteredUsers =
    searchTerm && searchTerm.trim() !== ''
      ? users?.filter(
        (customer) =>
          customer.firstName?.includes(searchTerm) ||
          customer.email?.includes(searchTerm) ||
          customer.id?.includes(searchTerm)
      )
      : users;

  const customer = (data: Customer) => {
    setData(data)
    onOpenDrawerHandler();
  }

  return (
    <View>
      {filteredUsers?.map((item, index) => (
        <View
          backgroundColor={index % 2 !== 0 ? 'disabled-faded' : 'page'}
          padding={3}
          paddingStart={2}
          direction="row"
          key={item.id}
        >
          {Object.entries(item).map(([field, value]) => (
            <Fragment key={item.id}>
              {renderField(field, value)}
            </Fragment>
          ))}
          <View.Item columns="auto" grow>
            <Button onClick={() => customer(item)}>
              Select
            </Button>

          </View.Item>
        </View>
      ))}

      {
        data &&
        <Drawer active={open} onClose={onCloseDrawerHandler} position='bottom' size='auto'>
          <DrawerHeader
            title={data.firstName + " " +  data.lastName}
            onClose={onCloseDrawerHandler}
          />
          <DrawerContent>
            <View gap={5}>
              <Tabs variant='pills-elevated'>
                <Tabs.List>
                  <Tabs.Item value="1">
                    Perfil
                  </Tabs.Item>
                  <Tabs.Item value="2">
                    Direccion
                  </Tabs.Item>
                  <Tabs.Item value="3">
                    Ordenes
                  </Tabs.Item>
                </Tabs.List>

                <Tabs.Panel value="1"><FormCustomer data={data} sendForm={sendForm} /></Tabs.Panel>
                <Tabs.Panel value="2">Tab 2</Tabs.Panel>
                <Tabs.Panel value="3">Tab 3</Tabs.Panel>
              </Tabs>
            </View>



          </DrawerContent>
        </Drawer>
      }
    </View>
  );
};
