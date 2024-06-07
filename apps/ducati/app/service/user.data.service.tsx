import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AddressData, Customer, ProductData } from "@ducati/types";
import { getAddress } from "@ducati/ui";
import { User, updatePassword } from "firebase/auth";
import { getProductById } from "./product.data.service";
import { db } from "@ducati/firebase";

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


export async function setLikeProduct(productId: string, uid: string) {
  try {
    const customerRef = doc(db, "customer", uid);
    const customerSnapshot = await getDoc(customerRef);

    if (!customerSnapshot.exists()) {
      throw new Error("El cliente no existe.");
    }

    const like = customerSnapshot.data()?.likeProduct as ProductData[] || [];
    const likeSet = new Set<string>(like.map(p => p.id!));

    let message: string;
    if (likeSet.has(productId)) {
      likeSet.delete(productId);
      message = "Producto eliminado de favoritos";
    } else {
      const product: ProductData | null = await getProductById(productId);
      if (product) {
        like.push(product);
        likeSet.add(productId);
        message = "Producto agregado a favoritos";
      } else {
        throw new Error("Producto no encontrado.");
      }
    }

    const updatedLike = Array.from(likeSet).map(id => like.find(p => p.id === id));

    await updateDoc(customerRef, { likeProduct: updatedLike });

    return {
      success: true,
      data: updatedLike,
      message,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: error,
    };
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

export async function getwishlist(uid: string) {
  try {
    const docRef = doc(db, "customer", uid);
    const customerData = await getDoc(docRef);
    const wishlist = customerData.data()?.likeProduct;
    return wishlist;
  } catch (error) {
    throw new Error(`Error al obtener el usuario con ID '${uid}': ${error}`);
  }
}

export async function setCustomer(customer: Customer) {
  try {
    let docRef;

    if (!customer.id) {
      docRef = await addDoc(collection(db, "customer"), { ...customer });
    } else {
      docRef = doc(db, "customer", customer.id);
      await setDoc(docRef, { ...customer });
    }

    return docRef.id;
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
    let addressesData;
    if (!customerSnapshot.exists()) {
      throw new Error("No se encontró el cliente con el ID proporcionado.");
    }

    addressID = customerSnapshot.data()?.addressID;

    if (!addressID) {
      const addressDocRef = await addDoc(collection(db, 'address'), { addresses: [address] });
      addressID = addressDocRef.id;
      await updateDoc(doc(db, 'customer', customerUID), { addressID });
    } else {
      const uid = formData.get('addressUid') as string;
      const docRef = doc(db, "address", addressID);
      const addressesSnapshot = await getDoc(docRef);
      addressesData = addressesSnapshot.data();

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

    return {
      success: true,
      message: `Documento escrito exitosamente`,
      addressesData: addressesData?.addresses
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
    let addressesData;

    if (customerSnapshot.exists()) {
      addressID = customerSnapshot.data()?.addressID;

      const docRef = doc(db, "address", addressID);
      const addressesSnapshot = await getDoc(docRef);
      addressesData = addressesSnapshot.data();
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
    return {
      success: true,
      message: `Documento escrito exitosamente`,
      addressesData: addressesData?.addresses
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al agregar dirección:',
      error: error
    };
  }
}

export async function updateCustomer(customerData: Customer, user: User) {
  try {
    const customer = {
      anonymous: false,
      email: customerData.email,
      lastName: customerData.lastName,
      lastModifiedAt: new Date(),
      firstName: customerData.firstName,
      phoneNumber: customerData.phoneNumber,
    };

    if (customerData.newPassword) {
      await updatePassword(user, customerData.newPassword);
    }

    const customerRef = doc(db, 'customer', customerData.id!);
    await updateDoc(customerRef, customer);

    const updatedCustomer = await getCustomerByUid(customerData.id!);

    return {
      success: true,
      data: updatedCustomer,
      message: 'Actualización Exitosa',
    };
  } catch (error) {
    console.error("Error updating customer data: ", error);
    return {
      success: false,
      data: null,
      message: (error as Error).message,
    };
  }
}