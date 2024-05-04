import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase.service";
import { CartData, CartEntry, Customer, PriceData, User } from "@ducati/types";
import { generateRandomId, getProductBySku } from "./product.data.service";

export async function getCartById(cartId: string) {
  const docRef = doc(db, 'cart', cartId);
  const cartSnapshot = await getDoc(docRef);
  try {
    if (cartSnapshot.exists()) {
      const cartData = cartSnapshot.data() as CartData;
      const cart = { ...cartData, id: cartSnapshot.id };
      return cart;
    } else {
      throw new Error(`El carrito con ID '${cartId}' no existe.`);
    }
  } catch (error) {
    throw new Error(`Error al obtener el carrito con ID '${cartId}': ${error}`);
  }
}

export async function getCart(uid: string): Promise<CartData> {
  try {
    const cartRef = doc(db, "customer", uid);
    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists() && cartSnapshot.data()?.cartId) {
      const cartId = cartSnapshot.data()?.cartId;
      return { id: cartId, entries: [] };
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


export async function createAnonymousCustomer(uid?: string): Promise<Customer> {
  try {
    const customerData: User = {
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
      entryNumber: parseInt(generateRandomId()), // Asignar un número de entrada (ajústalo según tu lógica)
      quantity: parseInt(quantity), // Convertir la cantidad a un número entero
      productCode: productCode // Asignar el código del producto
    };

    const cartDocRef = await addDoc(collection(db, "cart"), cartItem)

    const newCart: CartData = {
      id: uidAnonymous, // Utilizar la ID del documento como ID del carrito
      entries: [cartItem]
    };

    return newCart;
  } catch (error) {
    console.error("Error al crear el carrito anónimo:", error);
    throw error;
  }
}

export async function addItemToCart(cartCustomer: CartData, quantity: number, productCode: string, update?: boolean) {
  try {
    const product = await getProductBySku(productCode);

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
        existingItem.totalPrice.value.centsAmount = parseFloat(`${existingItem.product.value.centsAmount}`) * cartItem.quantity;
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