import { DocumentReference, DocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { db } from "../utils/firebase.service";
import { Cart, CartEntry, Customer, User } from "@ducati/types";
import { CartEntryData } from "@ducati/ui";
import { generateRandomId } from "./product.data.service";

export async function getCartById(cartId: string) {
  try {
    const docRef = doc(db, "cart", cartId);
    const cartSnapshot = await getDoc(docRef); // Limitar la consulta a un resultado

      return cartSnapshot.data() as Cart;
    
  } catch (error) {
    throw new Error(`Error al obtener el carrito con ID '${cartId}': ${error}`);
  }
}

export async function getCart(uid: string): Promise<Cart | undefined> {
  try {
    const q = query(collection(db, "carts"), where("uid", "==", uid));

    const cartRef = doc(db, "carts", uid);
    const cartSnapshot = await getDoc(cartRef);
    return cartSnapshot.exists() ? cartSnapshot.data() as Cart : undefined;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
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

export async function createAnonymousCart(quantity: string, productCode: string, uidAnonymous: string): Promise<Cart> {
  try {
    const cartItem = {
      id: "",
      entryNumber: parseInt(generateRandomId()), // Asignar un número de entrada (ajústalo según tu lógica)
      quantity: parseInt(quantity), // Convertir la cantidad a un número entero
      productCode: productCode // Asignar el código del producto
    };

    const cartDocRef = await addDoc(collection(db, "cart"), cartItem)

    const newCart: Cart = {
      id: uidAnonymous, // Utilizar la ID del documento como ID del carrito
      lineItems: [cartItem]
    };

    return newCart;
  } catch (error) {
    console.error("Error al crear el carrito anónimo:", error);
    throw error;
  }
}

export async function addItemToCart(uid: string, quantity: string, productCode: string, cart?: Cart): Promise<Cart> {
  try {
    const cartItem: CartEntry = {
      id: productCode, // Asignar el código del producto
      entryNumber: 0, // Asignar un número de entrada (ajústalo según tu lógica)
      quantity: parseInt(quantity), // Convertir la cantidad a un número entero
    };

    const docRef = doc(db, "cart", uid);
    const cartSnapshot = await getDoc(docRef);

    if (!cartSnapshot.exists()) {
      throw new Error("El carrito del usuario no existe");
    }

    const cartData = cartSnapshot.data() as Cart;

    const entryNumber = cartData.lineItems.length > 0 ? cartData.lineItems.length + 1 : 1;

    const updatedCart: Cart = {
      ...cartData,
      lineItems: [
        ...cartData.lineItems,
        {
          ...cartItem,
          entryNumber: entryNumber
        }
      ]
    };

    await setDoc(docRef, updatedCart);

    return updatedCart;
  } catch (error) {
    console.error("Error al agregar el artículo al carrito:", error);
    throw error;
  }
}

export async function updateCustomerCart(uid: string, cart: Cart): Promise<void> {
  try {
    const customerRef = doc(db, "customers", uid);
    await setDoc(customerRef, { cart: cart.id, lastModifiedAt: new Date() }, { merge: true });
  } catch (error) {
    console.error("Error al actualizar el carrito del cliente:", error);
    throw error;
  }
}