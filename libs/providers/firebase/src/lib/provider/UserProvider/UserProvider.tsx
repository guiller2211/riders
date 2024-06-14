import { bindActionCreators } from '@reduxjs/toolkit';
import { createContext, useReducer, useMemo, useContext } from 'react';
import type { Dispatch } from 'redux';

import { INITIAL_STATE, slice } from './UserProvider.slice';
import type { Context, UserProviderProps } from './UserProvider.types';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services';
import { AddressData, getAddress } from '@riders/ui';

export const UserContext = createContext<Context>({} as Context);

export const UserProvider = (props: UserProviderProps) => {
  const { children, initialState = INITIAL_STATE } = props;

  const [state, dispatch] = useReducer(slice.reducer, initialState);

  const actions = bindActionCreators(slice.actions, dispatch as Dispatch);

  const value = useMemo(() => {
    const userValue: Context = {
      ...state,
      actions,
      getAddressCustomer: async (uid: string) => {
        try {
          const docRef = doc(db, 'address', uid);
          const addressSnapshot = await getDoc(docRef);

          if (addressSnapshot.exists()) {
            const data = addressSnapshot.data();
            if (data) {
              const addresses = data.addresses as AddressData[];
              return addresses;
            }
          }
          return [];
        } catch (error) {
          throw new Error(`Error al obtener las direcciones: ${error}`);
        }
      },
      setAddress: async (formData: FormData, customerUID: string) => {
        const address = getAddress(formData);

        const customerRef = doc(db, "customer", customerUID);
        const customerSnapshot = await getDoc(customerRef);
        let addressID: string;
        let addressesData;
        if (!customerSnapshot.exists()) {
          throw new Error("No se encontró el cliente con el ID proporcionado.");
        }

        addressID = customerSnapshot.data()?.addressID;

        if (!addressID) {
          const addressDocRef = await addDoc(collection(db, 'address'), { addresses: [address] });
          addressID = addressDocRef.id;
          await updateDoc(doc(db, 'customer', customerUID), { addressID });
        } else {
          const uid = formData.get('addressUid') as string;
          const docRef = doc(db, "address", addressID);
          const addressesSnapshot = await getDoc(docRef);
          addressesData = addressesSnapshot.data();

          if (!addressesData || !addressesData.addresses) {
            throw new Error("Los datos de la dirección no son válidos o están incompletos");
          }

          const addressIndex = addressesData.addresses.findIndex((address: any) => address.id === uid);
          if (address.defaultShippingAddress) {
            const existingDefaultAddressIndex = addressesData.addresses.findIndex((address: any) => address.defaultShippingAddress);

            if (existingDefaultAddressIndex !== -1) {
              addressesData.addresses[existingDefaultAddressIndex].defaultShippingAddress = false;
            }
          }
          if (addressIndex !== -1) {
            addressesData.addresses[addressIndex] = address;
            await setDoc(docRef, addressesData);
          } else {
            addressesData.addresses.push(address);
            await setDoc(docRef, addressesData);
          }
        }

        return addressesData?.addresses as AddressData[]
      },
      deleteAddress: async (uid: string, customerUID: string) => {
        const customerRef = doc(db, "customer", customerUID);
        const customerSnapshot = await getDoc(customerRef);
        let addressID: string;
        let addressesData;

        if (customerSnapshot.exists()) {
          addressID = customerSnapshot.data()?.addressID;

          const docRef = doc(db, "address", addressID);
          const addressesSnapshot = await getDoc(docRef);
          addressesData = addressesSnapshot.data();
          if (!addressesData || !addressesData.addresses) {
            throw new Error("Los datos de la dirección no son válidos o están incompletos");
          }

          const addressIndex = addressesData.addresses.findIndex((address: any) => address.id === uid);
          if (addressIndex === -1) {
            throw new Error("No se encontró la dirección con el ID proporcionado");
          }

          addressesData.addresses.splice(addressIndex, 1);

          await updateDoc(docRef, { addresses: addressesData.addresses });
        }
        return addressesData?.addresses as AddressData[]

      },
    };

    return userValue;
  }, [actions, state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
