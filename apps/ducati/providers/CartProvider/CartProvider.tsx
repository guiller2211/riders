/* import { bindActionCreators } from '@reduxjs/toolkit';
import {
  createContext,
  useReducer,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import type { Dispatch } from 'redux';

import { INITIAL_STATE, slice } from './CartProvider.slice';
import type {
  CartProviderProps,
  Context,
} from './CartProvider.types';
import { getDocs, collection, doc, getDoc, addDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from '../../app/utils/firebase.service';
import { AddressData, CartEntryData, CartProps } from '@ducati/ui';

export const CartContext = createContext<Context>({} as Context);

export const CartProvider = (props: CartProviderProps) => {
  const { children, initialState = INITIAL_STATE } = props;

  const [state, dispatch] = useReducer(slice.reducer, initialState);


  const value = useMemo(() => {
    const cartValue: Context = {
      ...state,
      addItem: async (cartItem: CartEntryData) => {
        if (!cartItem.product) {
          throw new Error('product key is required');
      }
  
      const docRef = await addDoc(collection(db, "cart", cartItem.entryId), {
          productCode: cartItem.product.sku,
          quantity: cartItem.quantity,
      });
  
      // Construir un objeto CartEntryData con la información del documento
      const newCartItem: CartEntryData = {
          entryId: docRef.id, // O cualquier otro identificador del documento
          entryNumber: 0, // Aquí proporciona el valor adecuado si es necesario
          quantity: cartItem.quantity,
          product: cartItem.product // O cualquier otra información necesaria
      };
  
      return newCartItem;

      },
      deleteItem: async (cartItem: CartEntryData) => {

      },
      updateQuantity: async (cartItem: CartEntryData) => {

      },
      setShippingAddress: async (shippingAddress: AddressData) => {

      },
      setCart: (cart: CartProps) => {
        actions.updateCart(cart);
      },
    };

    return cartValue;
  }, [state]);

    useEffect(() => {
      actions.updateCart(initialState);
    }, [initialState]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);


 */