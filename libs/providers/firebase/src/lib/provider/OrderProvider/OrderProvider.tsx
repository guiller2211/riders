import { bindActionCreators } from '@reduxjs/toolkit';
import { createContext, useReducer, useMemo, useContext } from 'react';
import type { Dispatch } from 'redux';

import { INITIAL_STATE, slice } from './OrderProvider.slice';
import type {
  OrderProviderProps,
  Context,
} from './OrderProvider.types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services';
import { OrderData } from '@ducati/ui';

export const OrderContext = createContext<Context>({} as Context);

export const OrderProvider = (props: OrderProviderProps) => {
  const { children, initialState = INITIAL_STATE } = props;

  const [state, dispatch] = useReducer(slice.reducer, initialState);

  const actions = bindActionCreators(slice.actions, dispatch as Dispatch);


  const value = useMemo(() => {
    const orderValue: Context = {
      ...state,
      actions,
      getCustomerOrders: async (uid: string) => {
        const customerRef = doc(db, "customer", uid);
        const customerSnapshot = await getDoc(customerRef);

        if (customerSnapshot.exists()) {
          const customerData = customerSnapshot.data();

          const allOrders: OrderData[] = [];
          if (customerData.orderID) {

            const orderIDs = customerData.orderID;


            for (const orderID of orderIDs) {
              const orderRef = doc(db, "orders", orderID);
              const orderSnapshot = await getDoc(orderRef);

              if (orderSnapshot.exists()) {
                const orderData = orderSnapshot.data();

                const formattedOrder = {
                  numOrder: orderData.numOrder,
                  createdDate: orderData.createdDate,
                  status: orderData.status,
                  total: orderData.total,
                  ...orderData
                };

                allOrders.push({ id: orderSnapshot.id, ...formattedOrder });
              }
            }
          }

          return allOrders;
        } else {
          throw new Error("El cliente no existe");
        }

      },
      updateStatusOrder: async (status: string, uidOrder: string, uidCustomer: string) => {

        await updateDoc(doc(db, 'orders', uidOrder), { status });

        return await orderValue.getCustomerOrders(uidCustomer);
      }
    };

    return orderValue;
  }, [actions, state]);

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
function getOrders() {
  throw new Error('Function not implemented.');
}

