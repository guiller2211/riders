import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase.service";
import { AddressData, Customer } from "@ducati/types";
import { getAddress } from "@ducati/ui";

export async function getUserById(uid: string) {
  try {
    const docRef = doc(db, "user", uid);
    const userData = await getDoc(docRef);
    const user = userData.data() as Customer;
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
    const customer = customerData.data() as Customer;
    customer.id = customerData.id;
    return customer;
  } catch (error) {
    throw new Error(`Error al obtener el usuario con ID '${uid}': ${error}`);
  }
}

export async function getAddressCustomerById(uid: string) {
  try {
    const docRef = doc(db, 'address', uid);
    const addressSnapshot = await getDoc(docRef);

    if (addressSnapshot.exists()) {
      const data = addressSnapshot.data();
      if (data) {
        const addresses = data.addresses as AddressData[];
        return addresses;
      }
    }
    return [];
  } catch (error) {
    throw new Error(`Error al obtener las direcciones: ${error}`);
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

export async function setAddressCustomer(formData: FormData, customerUID: string) {
  try {
    const address = getAddress(formData);

    const customerRef = doc(db, "customer", customerUID);
    const customerSnapshot = await getDoc(customerRef);
    let addressID: string;

    if (customerSnapshot.exists()) {
      addressID = customerSnapshot.data()?.addressID;

      if (!addressID) {
        const addressDocRef = await addDoc(collection(db, 'address'), { addresses: [address] });
        addressID = addressDocRef.id;
        await updateDoc(doc(db, 'customer', customerUID), { addressID });
      } else {
        const uid = formData.get('addressUid') as string;
        const docRef = doc(db, "address", addressID);
        const addressesSnapshot = await getDoc(docRef);
        const addressesData = addressesSnapshot.data();

        if (!addressesData || !addressesData.addresses) {
          throw new Error("Los datos de la dirección no son válidos o están incompletos");
        }

        const addressIndex = addressesData.addresses.findIndex((address: any) => address.id === uid);
        if (address.defaultShippingAddress) {
          const existingDefaultAddressIndex = addressesData.addresses.findIndex((address: any) => address.defaultShippingAddress);

          if (existingDefaultAddressIndex !== -1) {
            addressesData.addresses[existingDefaultAddressIndex].defaultShippingAddress = false;
          }
        }
        if (addressIndex !== -1) {
          addressesData.addresses[addressIndex] = address;
          await setDoc(docRef, addressesData);
        } else {
          addressesData.addresses.push(address);
          await setDoc(docRef, addressesData);
        }
      }

    } else {
      throw new Error("No se encontró el cliente con el ID proporcionado.");
    }

    return {
      success: true,
      message: `Documento escrito exitosamente`
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al agregar dirección:',
      error: error
    };
  }
}


export async function deleteShippingAddress(uid: string, customerUID: string) {
  try {
    const customerRef = doc(db, "customer", customerUID);
    const customerSnapshot = await getDoc(customerRef);
    let addressID: string;

    if (customerSnapshot.exists()) {
      addressID = customerSnapshot.data()?.addressID;

      const docRef = doc(db, "address", addressID);
      const addressesSnapshot = await getDoc(docRef);
      const addressesData = addressesSnapshot.data();
      if (!addressesData || !addressesData.addresses) {
        throw new Error("Los datos de la dirección no son válidos o están incompletos");
      }

      const addressIndex = addressesData.addresses.findIndex((address: any) => address.id === uid);
      if (addressIndex === -1) {
        throw new Error("No se encontró la dirección con el ID proporcionado");
      }

      addressesData.addresses.splice(addressIndex, 1);

      await updateDoc(docRef, { addresses: addressesData.addresses });
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

