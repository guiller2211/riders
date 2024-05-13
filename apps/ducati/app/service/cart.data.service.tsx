import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase.service";
import { AddressData, CartData, CartEntry, Customer, PriceData, ShippingMethod } from "@ducati/types";
import { generateRandomId, getProductBySku } from "./product.data.service";

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


export function getCart(uid: string): Promise<CartData> {
  const cartRef = doc(db, "customer", uid);
  return getDoc(cartRef)
    .then(cartSnapshot => {
      if (cartSnapshot.exists() && cartSnapshot.data()?.cartId) {
        const cartId = cartSnapshot.data()?.cartId;
        return { id: cartId, entries: [] };
      } else {
        return addDoc(collection(db, "cart"), { entries: [] })
          .then(newCartRef => {
            return updateDoc(cartRef, { cartId: newCartRef.id })
              .then(() => {
                return { id: newCartRef.id, entries: [] };
              });
          });
      }
    })
    .catch(error => {
      console.error("Error al obtener o crear el carrito:", error);
      throw error;
    });
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

export function addItemToCart(cartCustomer: CartData, quantity: number, productCode: string, update?: boolean) {
  const productPromise = getProductBySku(productCode);

  return productPromise.then(product => {
    const cartItem: CartEntry = {
      product: {
        image: product?.image,
        name: product?.name,
        description: product?.description,
        stock: product?.stock,
        categories: product?.categories,
        value: product?.value!,
        sku: product?.sku,
      },
      id: product?.id,
      entryNumber: 0,
      quantity: quantity,
      totalPrice: product?.value ?
        { value: { ...product.value, centsAmount: (parseFloat(`${product.value.centsAmount}`) * quantity) }, }
        : undefined,
    };

    const docRef = doc(db, "cart", cartCustomer.id!);
    return getDoc(docRef).then(cartSnapshot => {
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
          existingItem.totalPrice.value.centsAmount = !update ? parseFloat(`${existingItem.product.value.centsAmount}`) * cartItem.quantity : parseFloat(`${existingItem.product.value.centsAmount}`) * existingItem.quantity
        }
        cartItem.totalPrice = existingItem.totalPrice;
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

      return setDoc(docRef, { entries: cartData.entries, totalPrice: updatedTotalPrice }).then(() => {
        return getCartById(cartCustomer.id!).then(cartUpdate => {
          return { cartItem: cartItem, cartUpdate: cartUpdate };
        });
      });
    });
  }).catch(error => {
    console.error("Error al agregar el artículo al carrito:", error);
    throw error;
  });
}

export function deleteEntryBySku(cartCustomer: CartData, productCode: string) {
  if (!cartCustomer.id || !productCode) {
    throw new Error("Invalid input parameters");
  }

  const docRef = doc(db, "cart", cartCustomer.id);
  return getDoc(docRef).then(cartSnapshot => {
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

    return updateDoc(docRef, {
      entries: updatedEntries,
      totalPrice: updatedTotalPrice
    }).then(() => {
      return getCartById(cartCustomer.id!);
    });
  }).catch(error => {
    console.error("Error deleting entry:", error);
    throw error; // Re-throw the error for the caller to handle
  });
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

