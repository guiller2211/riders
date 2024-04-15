import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase.service";
import { Customer } from "@backoffice/types";


export async function getCustomer() {
  try {
    const productsSnapshot = await getDocs(collection(db, "customer"));

    const customersData: Customer[] = await Promise.all(productsSnapshot.docs.map(async (doc) => {
      const customerData = doc.data() as Customer;
      customerData.id = doc.id;

      const { id, firstName, email, ...rest } = customerData;
      return { id, firstName, email, ...rest };
    }));

    return customersData;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

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

    if (!customer.id) {
      throw new Error("El ID del cliente no está definido");
    }

    await setDoc(doc(db, "customer", customer.id), { ...customer });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function getUsers() {
  try {
    const productsSnapshot = await getDocs(collection(db, "user"));

    const customersData: Customer[] = await Promise.all(productsSnapshot.docs.map(async (doc) => {
      const customerData = doc.data() as Customer;
      customerData.id = doc.id;

      const { id, firstName, email, ...rest } = customerData;
      return { id, firstName, email, ...rest };
    }));

    return customersData;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}
