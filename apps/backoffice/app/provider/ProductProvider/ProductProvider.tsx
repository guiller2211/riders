import { bindActionCreators } from '@reduxjs/toolkit';
import {
  createContext,
  useReducer,
  useMemo,
  useContext,
} from 'react';
import type { Dispatch } from 'redux';

import { INITIAL_STATE, slice } from './ProductProvider.slice';
import type {
  Context,
  ProductProviderProps,
} from './ProductProvider.types';
import { getDocs, collection, doc,  addDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../utils/firebase.service";
import { ref, uploadBytes } from "firebase/storage";
import { getProduct as getProductUtil } from "@backoffice/ui";

export const ProductContext = createContext<Context>({} as Context);

export const ProductProvider = (props: ProductProviderProps) => {
  const { children, initialState = INITIAL_STATE } = props;

  const [state, dispatch] = useReducer(slice.reducer, initialState);

  const actions = bindActionCreators(slice.actions, dispatch as Dispatch);

  const value = useMemo(() => {
    const productValue: Context = {
      ...state,
      actions,
      addProduct: async (formData: FormData) => {
        try {
          const product = getProductUtil.getAddProduct(formData);
          const productName = formData.get('productName') as string;
          const image = formData.get('image') as File;

          const format = image.name.split('.').pop();
          const nameImage = productName.replace(/\s+/g, ''); // Eliminar espacios en blanco
          const imageFileName = `${nameImage}.${format}`;
          const productRef = collection(db, 'product')

          const productDocRef = doc(productRef);
          await setDoc(productDocRef, product);

          const productId = productDocRef.id;

          await Promise.all([
            addDoc(collection(db, 'price'), {
              ...product.value,
              value: product.value,
              productId: productId
            }),
            addDoc(collection(db, 'image'), {
              id: productId,
              url: `${nameImage}/${imageFileName}`,
              label: productName,
              dimensions: {
                width: 350,
                height: 350
              },
              default: false
            }),
            addDoc(collection(db, 'stock'), {
              ...product.stock,
              productId: productId
            }),

            (await getDocs(collection(db, "category"))).docs.map((_id) => {
              if (product.categories?.id == _id.id) {
                product.categories.id = _id.id;
                product.categories.name = _id.data().type
              }
            }),

            updateDoc(doc(db, "product", productId), {
              id: productId,
              price: { ...product.value, id: productId },
              categories: { ...product.categories, },
              image: product.image?.map((image: any) => ({ ...image, id: productId })),
              stock: { ...product.stock, productId: productId }
            })
          ]);

          const imageRef = ref(storage, `product/${nameImage}/${imageFileName}`);
          await uploadBytes(imageRef, image);

          return {
            success: true,
            message: `Documento '${productDocRef.id}' escrito exitosamente`
          };
        } catch (error) {
          return {
            success: false,
            message: 'Error al agregar productos:',
            error: error
          };
        }
      },
      deleteProduct: async (uid: string) => {
        try {
          await deleteDoc(doc(db, "product", uid));
          return {
            success: true,
            message: `Documento eliminadp exitosamente`
          };
        } catch (error) {
          console.error(error);
        }
        return;
      },
      updateProduct: async (formData: FormData) => {
        return null; // Llama a la función correspondiente
      },
    };

    return productValue;
  }, [actions, state]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProduct = () => useContext(ProductContext);