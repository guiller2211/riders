import { FormEvent, useEffect, useState } from 'react';

import type { CustomersHistoryProps } from './CustomersHistory.types';
import { CustomersHistoryBody } from '../CustomersHistoryBody';
import { Drawer, DrawerContent, DrawerHeader, Table } from '../../shared';
import { View } from '../../../atomic';
import { useOpenState } from '../../../../hooks/useOpenState';

export const CustomersHistory = (props: CustomersHistoryProps) => {
  const fieldNames = ['Id', 'Nombre', 'Email', 'Accion'];
  const [searchTerm, setSearchTerm] = useState('');
  const { users } = props;
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();


  const search = (search: string) => {
    setSearchTerm(search);
  };
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*  setIsloading(true);
 
     const formData = new FormData(e.currentTarget);
     const email: string = formData.get('email') as string;
     const password: string = formData.get('password') as string;
 
     const authResult = await loginWithEmailAndPassword(email, password);
 
     if (authResult && authResult.success) {
       await fetcher.submit({ __session: authResult.__session, "email-login": true }, { method: "post" });
     } else {
       setNotification(authResult ? authResult.error : "error");
       setIsloading(false);
     } */
  };

  return (
    <View>
      <Table
        showSearcher
        fieldNames={fieldNames}
        searchTerm={search}
        open={onOpenDrawerHandler}
      >
        <CustomersHistoryBody users={users} searchTerm={searchTerm} sendForm={submitForm} />
        <Drawer active={open} onClose={onCloseDrawerHandler} position='bottom'>
          <DrawerHeader
            title="Vacio"
            onClose={onCloseDrawerHandler}

          />
          <DrawerContent>
            Hola mundo
          </DrawerContent>
        </Drawer>
      </Table>
    </View>
  );
};

