import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../server/firebase.service";
import { AddressData, AppRoutes, CartData, CartEntry, Customer, PriceData, ProductVariant, ShippingMethod } from "@ducati/types";
import { generateRandomId, getProductBySku } from "./product.data.service";
import { PaymentProps, OrderData } from "@ducati/ui";
import { useNavigate } from "@remix-run/react";

export function getCartById(cartId: string): Promise<CartData> {
  const docRef = doc(db, 'cart', cartId);
  return getDoc(docRef)
    .then(cartSnapshot => {
      if (!cartSnapshot.exists()) {
        throw new Error(`El carrito con ID '${cartId}' no existe.`);
      }
      const cartData = cartSnapshot.data() as CartData;
      return { ...cartData, id: cartSnapshot.id };
    })
    .catch(error => {
      console.error(`Error al obtener el carrito con ID '${cartId}':`, error);
      throw error;
    });
}


export async function getCart(uid: string): Promise<CartData> {
  const cartRef = doc(db, "customer", uid);

  try {
    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists()) {
      const cartData = cartSnapshot.data();

      if (cartData?.cartId && cartData.cartId !== '') {
        return { id: cartData.cartId, entries: [] };
      } else {
        const newCartRef = await addDoc(collection(db, "cart"), { entries: [] });
        await updateDoc(cartRef, { cartId: newCartRef.id });
        return { id: newCartRef.id, entries: [] };
      }
    } else {
      const newCartRef = await addDoc(collection(db, "cart"), { entries: [] });
      await updateDoc(cartRef, { cartId: newCartRef.id });
      return { id: newCartRef.id, entries: [] };
    }
  } catch (error) {
    console.error("Error al obtener o crear el carrito:", error);
    throw error;
  }
}

export function getOrCreateCart(uid: string): Promise<CartData> {
  const customerRef = doc(db, "customer", uid);
  return getDoc(customerRef)
    .then(customerSnapshot => {
      let cartId: string;

      if (customerSnapshot.exists() && customerSnapshot.data()?.cartId) {
        cartId = customerSnapshot.data()?.cartId;
      } else {
        return addDoc(collection(db, "cart"), { entries: [] })
          .then(newCartRef => {
            return updateDoc(customerRef, { cartId: newCartRef.id })
              .then(() => {
                cartId = newCartRef.id;
                return { id: cartId, entries: [] };
              });
          });
      }

      return { id: cartId, entries: [] };
    })
    .catch(error => {
      console.error("Error al obtener o crear el carrito:", error);
      throw error;
    });
}


export async function createAnonymousCustomer(uid?: string): Promise<Customer> {
  try {
    const customerData: Customer = {
      id: uid || '',
      anonymous: true,
    };
    const customerRef = await addDoc(collection(db, "customers"), customerData);
    return { ...customerData, id: customerRef.id };
  } catch (error) {
    console.error("Error al crear el cliente anónimo:", error);
    throw error;
  }
}

export async function createAnonymousCart(quantity: string, productCode: string, uidAnonymous: string): Promise<CartData> {
  try {
    const cartItem = {
      id: "",
      entryNumber: parseInt(generateRandomId()),
      quantity: parseInt(quantity),
      productCode: productCode,
    };

    const cartDocRef = await addDoc(collection(db, "cart"), cartItem);
    return { id: uidAnonymous, entries: [cartItem] };
  } catch (error) {
    console.error("Error al crear el carrito anónimo:", error);
    throw error;
  }
}

export async function addItemToCart(
  cartCustomer: CartData,
  quantity: number,
  productCode: string,
  update?: boolean,
  variants?: ProductVariant[],
  ) {
  try {
    const product = await getProductBySku(productCode);

    const cartItem: CartEntry = {
      product: {
        image: product?.image?.filter((_i) => _i.default),
        name: product?.name,
        description: product?.description,
        stock: product?.stock,
        categories: product?.categories,
        value: product?.value!,
        sku: product?.sku,
        ...(variants ? { variants } : {}), 
      },
      id: product?.id,
      entryNumber: 0,
      quantity: quantity,
      totalPrice: product?.value ?
        { value: { ...product.value, centsAmount: (parseFloat(`${product.value.centsAmount}`) * quantity) }, }
        : undefined,
    };

    const docRef = doc(db, "cart", cartCustomer.id!);
    const cartSnapshot = await getDoc(docRef);

    const cartData = cartSnapshot.data() as CartData;

    if (!cartData || !cartData.entries) {
      throw new Error("Los datos del carrito no son válidos o están incompletos");
    }

    const existingItem = cartData.entries.find(entry =>
      entry.product?.sku === cartItem.product?.sku
    );

    if (existingItem) {
      update ? existingItem.quantity = cartItem.quantity : existingItem.quantity += cartItem.quantity;

      if (existingItem.totalPrice && existingItem.product?.value) {
        existingItem.totalPrice.value.centsAmount = parseFloat(`${existingItem.product.value.centsAmount}`) * existingItem.quantity
      }
      cartItem.totalPrice = existingItem.totalPrice;
      cartItem.quantity = existingItem.quantity;
    } else {
      cartData.entries.push(cartItem);
    }

    const totalCentsAmount = parseFloat(`${cartData.entries.reduce((total, entry) =>
      total + (entry.totalPrice?.value.centsAmount || 0), 0)}`
    );

    const updatedTotalPrice: PriceData = {
      value: {
        ...cartItem.totalPrice!.value!,
        centsAmount: totalCentsAmount,
      }
    };

    await setDoc(docRef, { entries: cartData.entries, totalPrice: updatedTotalPrice });
    const cartUpdate = await getCartById(cartCustomer.id!);

    return { cartItem: cartItem, cartUpdate: cartUpdate };
  } catch (error) {
    console.error("Error al agregar el artículo al carrito:", error);
    throw error;
  }
}

export async function deleteEntryBySku(cartCustomer: CartData, productCode: string) {
  try {
    if (!cartCustomer.id || !productCode) {
      throw new Error("Invalid input parameters");
    }

    const docRef = doc(db, "cart", cartCustomer.id);
    const cartSnapshot = await getDoc(docRef);

    if (!cartSnapshot.exists()) {
      throw new Error("Cart data not found");
    }

    const cartData = cartSnapshot.data() as CartData;

    if (!cartData || !cartData.entries) {
      throw new Error("Invalid or incomplete cart data");
    }

    const updatedEntries = cartData.entries.filter(entry =>
      entry.product?.sku !== productCode
    );

    let totalCentsAmount = 0;
    updatedEntries.forEach(entry => {
      const entryPrice = parseFloat(`${entry.product?.value?.centsAmount}`);
      totalCentsAmount += entry.quantity * entryPrice;
    });

    const updatedTotalPrice: PriceData = {
      value: {
        ...cartData.totalPrice!.value!,
        centsAmount: totalCentsAmount,
      }
    };

    await updateDoc(docRef, {
      entries: updatedEntries,
      totalPrice: updatedTotalPrice
    });

    return getCartById(cartCustomer.id);
  } catch (error) {
    console.error("Error deleting entry:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function updateCustomerCart(uid: string, cart: CartData): Promise<void> {
  try {
    const customerRef = doc(db, "customers", uid);
    await setDoc(customerRef, { cart: cart.id, lastModifiedAt: new Date() }, { merge: true });
  } catch (error) {
    console.error("Error al actualizar el carrito del cliente:", error);
    throw error;
  }
}

export async function getAvailableShippingMethods() {
  const shippingMethodSnapshot = await getDoc(doc(db, "shippingMethods", 'ljKZTpYzZWx9zQQjZgSr'));

  try {
    if (shippingMethodSnapshot.exists()) {
      const shippingMethodData = shippingMethodSnapshot.data();
      if (shippingMethodData) {
        const shippingMethods = shippingMethodData.shippingMethods as ShippingMethod[];
        return shippingMethods;
      }
      return [];

    } else {
      return [];
    }
  } catch (error) {
    throw new Error(`Error al obtener las direcciones: ${error}`);
  }

}

export function setShippingAddress(value: AddressData, uid: string) {
  return getCart(uid)
    .then(cart => {
      if (!cart) {
        throw new Error("El carrito del usuario no existe.");
      }

      const cartDocRef = doc(db, "cart", cart.id!);
      return getDoc(cartDocRef)
        .then(cartSnapshot => {
          if (cartSnapshot.exists()) {
            return updateDoc(cartDocRef, { shippingAddress: value })
              .then(() => getCartById(cart.id!));
          } else {
            throw new Error("El carrito del usuario no existe.");
          }
        });
    })
    .catch(error => {
      console.error("Error al establecer la dirección de envío:", error);
      throw error;
    });
}

export function setShippingMethod(value: ShippingMethod, uid: string) {
  return getCart(uid)
    .then(cart => {
      if (!cart) {
        throw new Error("El carrito del usuario no existe.");
      }

      const cartDocRef = doc(db, "cart", cart.id!);
      return getDoc(cartDocRef)
        .then(cartSnapshot => {
          if (cartSnapshot.exists()) {
            return updateDoc(cartDocRef, { shippingMethod: value })
              .then(() => getCartById(cart.id!));
          } else {
            throw new Error("El carrito del usuario no existe.");
          }
        });
    })
    .catch(error => {
      console.error("Error al establecer la dirección de envío:", error);
      throw error;
    });
}

export const setPayment = async (value: PaymentProps, uid: string) => {
  const navigate = useNavigate();

  await getCart(uid).then(cart => {
    if (!cart) {
      throw new Error("El carrito del usuario no existe.");
    }

    const cartDocRef = doc(db, "cart", cart.id!);
    getDoc(cartDocRef)
      .then(cartSnapshot => {
        if (cartSnapshot.exists()) {
          return updateDoc(cartDocRef, { paymentMethod: value })
            .then(() => getCartById(cart.id!));
        } else {
          throw new Error("El carrito del usuario no existe.");
        }
      });
      navigate(AppRoutes.OrdenConfirmation);

  }).catch(error => {
    console.error("Error al establecer la dirección de envío:", error);
    throw error;
  });

  return await getCart(uid).then(newCart => {
    const cartDocRef = doc(db, "cart", newCart.id!);
    getDoc(cartDocRef)
      .then(cartSnapshot => {
        if (cartSnapshot.exists()) {
          const order = cartSnapshot.data() as OrderData;
          return addDoc(collection(db, "orders"), { order })
            .then(async (order) => {
              getCartById(newCart.id!)
              const customerRef = doc(db, "customer", uid);
              const customerSnapshot = await getDoc(customerRef);
              let orderID;

              if (customerSnapshot.exists()) {
                orderID = customerSnapshot.data()?.orderID as string[];
                if (!orderID) {
                  await updateDoc(doc(db, 'customer', uid), { orderID: [order.id], cartId: '' });
                } else {
                  updateDoc(doc(db, "customer", uid), { orderID: [...orderID, order.id], cartId: '' })
                }
              }

            });
        } else {
          throw new Error("El carrito del usuario no existe.");
        }
      });

  })
}



