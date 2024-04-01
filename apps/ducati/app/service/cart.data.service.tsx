import { addDoc, collection, doc, getDoc, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../utils/firebase.service";
import { CartData, CartEntry, Customer, PriceData, User } from "@ducati/types";
import { generateRandomId, getProductBySku } from "./product.data.service";

export async function getCartById(cartId: string) {
  try {
    const docRef = doc(db, "cart", cartId);
    const cartSnapshot = await getDoc(docRef); // Limitar la consulta a un resultado

    return cartSnapshot.data() as CartData;

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

export async function addItemToCart(cartCustomer: CartData, quantity: string, productCode: string): Promise<CartEntry> {
  try {
    const product = await getProductBySku(productCode);

    const cartItem: CartEntry = {
      product: {
        image: product?.image,
        name: product?.name,
        description: product?.description,
        stock: product?.stock,
        categories: product?.categories,
        price: product?.price,
        sku: product?.sku,
        type: product?.type,
      },
      id: product?.id,
      entryNumber: 0,
      quantity: parseInt(quantity),
      totalPrice: product?.price ?
        { value: { ...product.price.value, centsAmount: parseFloat(product.price.value.centsAmount.toString()) }, }
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
      existingItem.quantity += cartItem.quantity;
      if (existingItem.totalPrice && existingItem.product?.price) {

        existingItem.totalPrice.value.centsAmount = parseFloat(existingItem.product.price.value.centsAmount.toString()) * existingItem.quantity;
      }
    } else {
      cartData.entries.push(cartItem);
    }

    const totalCentsAmount = parseFloat(
      cartData.entries.reduce((total, entry) =>
        total + (entry.totalPrice?.value.centsAmount || 0), 0).toString()
    );

    const updatedTotalPrice: PriceData = {
      value: {
        ...cartItem.totalPrice!.value!,
        centsAmount: totalCentsAmount,
      }
    };

    await setDoc(docRef, { entries: cartData.entries, totalPrice: updatedTotalPrice });

    return cartItem;

  } catch (error) {
    console.error("Error al agregar el artículo al carrito:", error);
    throw error;
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