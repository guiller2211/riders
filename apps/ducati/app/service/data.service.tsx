import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase.service";

export async function getProducts() {
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsData = productsSnapshot.docs.map((doc) => doc.data());
    return productsData;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}


export async function getProductsBySku(skuId?: string) {
  try {

    if (skuId) {
      const product = await doc(db, "products", skuId);
      const productData = await getDoc(product);
      return productData.data();
    }
    return null;

  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

export async function getUser(uid: string) {
  try {
    const docRef = doc(db, "users", uid);
    const userData = await getDoc(docRef);

    return userData.data();
  } catch (error) {
    console.error(`Error al obtener el usuario con ID '${uid}':`, error);
    throw new Error(`Error al obtener el usuario con ID '${uid}': ${error}`);
  }
}

//add products
/* const docData = [
  {
    id: "123abc",
    name: "",
    description: "",
    type: "",
    categories: {},
    price: {
      value: {
        currency: {
          name: "USA",
          symbol: "$100.000",
          isocode: "US",
          decimalPlaces: 0,
          symbolPosition: "AFTER"
        },
        centsAmount: 100
      },
      active: true,
      productId: "1234"
    },
    attributes: {},
    images: [
      {
        url: "/assets/images/product/1.png",
        label: "V4",
        dimensions: {
          width: 350,
          height: 350
        }
      }
    ],
    variants: {},
    sku: "123abc",
    image: {
      url: "/assets/images/product/1.png",
      label: "V4",
      dimensions: {
        width: 350,
        height: 350
      }
    },
  },
  {
    id: "abc123",
    name: "",
    description: "",
    type: "",
    categories: {},
    price: {
      value: {
        currency: {
          name: "USA",
          symbol: "$100.000",
          isocode: "US",
          decimalPlaces: 0,
          symbolPosition: "AFTER"
        },
        centsAmount: 100
      },
      active: true,
      productId: "1234"
    },
    attributes: {},
    images: [
      {
        url: "/assets/images/product/2.png",
        label: "V4",
        dimensions: {
          width: 350,
          height: 350
        }
      },
      {
        url: "/assets/images/product/3.png",
        label: "V4",
        dimensions: {
          width: 350,
          height: 350
        }
      }
    ],
    variants: {},
    sku: "abc123",
    image: {
      url: "/assets/images/product/2.png",
      label: "V4",
      dimensions: {
        width: 350,
        height: 350
      }
    },
  },
  {
    id: "1a2b3c",
    name: "",
    description: "",
    type: "",
    categories: {},
    price: {
      value: {
        currency: {
          name: "USA",
          symbol: "$100.000",
          isocode: "US",
          decimalPlaces: 0,
          symbolPosition: "AFTER"
        },
        centsAmount: 100
      },
      active: true,
      productId: "1234"
    },
    attributes: {},
    images: [
      {
        url: "/assets/images/product/2.png",
        label: "V4",
        dimensions: {
          width: 350,
          height: 350
        }
      },
      {
        url: "/assets/images/product/1.png",
        label: "V4",
        dimensions: {
          width: 350,
          height: 350
        }
      },
      {
        url: "/assets/images/product/3.png",
        label: "V4",
        dimensions: {
          width: 350,
          height: 350
        }
      }
    ],
    variants: {},
    sku: "1a2b3c",
    image: {
      url: "/assets/images/product/3.png",
      label: "V4",
      dimensions: {
        width: 350,
        height: 350
      }
    },
  }
];


export async function addProductsById() {
  try {
    await Promise.all(docData.map(async (i) => {
      try {
        setDoc(doc(db, "products", i.sku), i)
        console.log(`Documento '${i.id}' escrito exitosamente`);
      } catch (error) {
        console.error(`Error al escribir el documento '${i.id}':`, error);
      }
    }));

    console.log('Todos los documentos fueron escritos exitosamente');
  } catch (error) {
    console.error('Error al agregar productos:', error);
    throw error;
  }
}  */
