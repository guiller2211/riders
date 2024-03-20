/* import { bindActionCreators } from '@reduxjs/toolkit';
import { createContext, useReducer, useMemo, useContext } from 'react';
import axios from 'axios';
import type { Dispatch } from 'redux';

import { INITIAL_STATE, slice } from './OrderProvider.slice';
import type {
  ApiResponse,
  OrderProviderProps,
  Context,
} from './OrderProvider.types';
import { useCart } from '../CartProvider';
import type { SessionContextProps } from '../../context';
import { SessionContext } from '../../context';

export const OrderContext = createContext<Context>({} as Context);

export const OrderProvider = (props: OrderProviderProps) => {
  const { children, initialState = INITIAL_STATE } = props;

  const [state, dispatch] = useReducer(slice.reducer, initialState);

  const actions = bindActionCreators(slice.actions, dispatch as Dispatch);

  const { setCart } = useCart();
  const sessionCtx: SessionContextProps = useContext(SessionContext);

  const value = useMemo(() => {
    const orderValue: Context = {
      ...state,
      actions,
      createFromCart: async (pONumber: string) => {
        if (!pONumber) {
          throw new Error('purchase order number is required');
        }
        const response = await axios.post<ApiResponse>('/api/order', {
          pONumber,
        });

        const { order, session, cart } = response.data;
        actions.updateOrder(order);

        setCart(cart);

        sessionCtx.session.cart = session.cart;

        return order;
      },
    };

    return orderValue;
  }, [actions, state]);

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
 */