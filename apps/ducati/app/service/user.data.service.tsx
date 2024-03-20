import { getDocs, collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { db, storage } from "../utils/firebase.service";
import { StorageReference, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Cart, Customer, Product, User } from "@ducati/types";

export async function getUserById(uid: string) {
  try {
    const docRef = doc(db, "user", uid);
    const userData = await getDoc(docRef);
    const user = userData.data() as Customer
    user.id = userData.id;
    return user;
  } catch (error) {
    throw new Error(`Error al obtener el usuario con ID '${uid}': ${error}`);
  }
}

export async function getCustomerByUid(uid: string) {
  try {
    const docRef = doc(db, "customer", uid);
    const customerData = await getDoc(docRef);
    const customer = customerData.data() as Customer
    customer.id = customerData.id;
    return customer;
  } catch (error) {
    throw new Error(`Error al obtener el usuario con ID '${uid}': ${error}`);
  }
}

export async function setCustomer(customer: Customer) {
  try {
    const emptyCart: Cart = {
      id: "", 
      lineItems: []
    };

    const cartRef = await addDoc(collection(db, "cart"), emptyCart);

    await setDoc(doc(db, "customer", customer.id), {
      ...customer,
      cart: {},
      cartId: cartRef.id 
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


