import { getDocs, collection, doc, getDoc, addDoc } from "firebase/firestore";
import { db, storage } from "../utils/firebase.service";
import { StorageReference, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Product } from "@ducati/types";


export async function getMotorcycles() {
    try {
        const productsSnapshot = await getDocs(collection(db, "motorcycles"));

        const productsData: Product[] = await Promise.all(productsSnapshot.docs.map(async (doc) => {
            const productData = doc.data() as Product;

            productData.id = doc.id;
            if (productData.image) {
                const imageRef = ref(storage, "/motorcycles/" + productData.image.url);
                try {
                    const imageUrl = await getDownloadURL(imageRef);
                    productData.image.url = imageUrl;
                } catch (error) {
                    console.error('Error al obtener la URL de descarga de la imagen para el producto', productData.id, ':', error);
                    delete productData.image;
                }
            }
            return productData;
        }));

        return productsData;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

export async function getMotorcyclesBySku(skuId?: string) {
    try {
        if (skuId) {
            const productRef = doc(db, "motorcycles", skuId);
            const productSnapshot = await getDoc(productRef);
            const productData = productSnapshot.data() as Product;
            
            if (productData) {
                productData.id = productSnapshot.id;
                
                if (productData.image) {
                    const image = ref(storage, "/motorcycles/" + productData.image.url);
                    try {
                        const imageUrl = await getDownloadURL(image);
                        productData.image.url = imageUrl;
                    } catch (error) {
                        console.error('Error al obtener la URL de descarga de la imagen principal para el producto', productData.id, ':', error);
                        delete productData.image;
                    }

                    if (productData.images && productData.images?.length >= 0) {
                        for (const img of productData.images) {
                            const imagesRef = ref(storage, "/motorcycles/" + img.url);
                            try {
                                const imagesUrl = await getDownloadURL(imagesRef);
                                img.url = imagesUrl;
                            } catch (error) {
                                console.error('Error al obtener la URL de descarga de las imágenes adicionales para el producto', productData.id, ':', error);
                            }
                        }
                    }
                }

                return productData;
            }
        }
        return null;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}


export async function addProduct(type: string,
    category: string,
    image: File,
    price: string,
    description: string,
    productName: string) {
    const skuId = generateRandomId();
    const formart = image.name.split('.').pop();
    const imageFileName = `${productName}.${formart}`;

    const product = {
        name: productName,
        description: description,
        type: type,
        categories: category,
        price: {
            value: {
                currency: {
                    name: "CHL",
                    symbol: "$" + price,
                    isocode: "CHL",
                    decimalPlaces: 0,
                    symbolPosition: "AFTER"
                },
                centsAmount: price
            },
            active: true,
            productId: skuId
        },
        images: [
            {
                url: productName + "/images/" + imageFileName,
                label: "productName",
                dimensions: {
                    width: 350,
                    height: 350
                }
            }
        ],
        sku: skuId,
        image: {
            url: productName + "/" + imageFileName,
            label: "productName",
            dimensions: {
                width: 350,
                height: 350
            }
        }
    };

    try {
        let imageRef: StorageReference | null = null;
        let imagesRef: StorageReference | null = null;
        let collectionName: string = "";

        switch (type) {
            case "MOTO":
                collectionName = "motorcycles";
                break;

            case "ACCESORIOS":
                collectionName = "accessories";
                break;
        }

        if (collectionName) {
            const produtcId = await addDoc(collection(db, collectionName), product);
            imageRef = ref(storage, `${collectionName}/${productName}/${imageFileName}`);
            imagesRef = ref(storage, `${collectionName}/${productName}/images/${imageFileName}`);

            await Promise.all([
                uploadBytes(imageRef, image),
                uploadBytes(imagesRef, image)
            ]);

            return {
                success: true,
                message: `Documento '${produtcId.id}' escrito exitosamente`
            };
        } else {
            throw new Error("No se proporcionó una categoría válida.");
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error al agregar productos:', error
        };
    }
}


export async function getAccessories() {
    try {
        const productsSnapshot = await getDocs(collection(db, "accessories"));

        const productsData: Product[] = await Promise.all(productsSnapshot.docs.map(async (doc) => {
            const productData = doc.data() as Product;

            productData.id = doc.id;
            if (productData.image) {
                const imageRef = ref(storage, "/accessories/" + productData.image.url);
                try {
                    const imageUrl = await getDownloadURL(imageRef);
                    productData.image.url = imageUrl;
                } catch (error) {
                    console.error('Error al obtener la URL de descarga de la imagen para el producto', productData.id, ':', error);
                    delete productData.image;
                }
            }
            return productData;
        }));

        return productsData;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

export async function getAccessoriesBySku(skuId?: string) {
    try {
        if (skuId) {
            const productRef = doc(db, "accessories", skuId);
            const productSnapshot = await getDoc(productRef);
            const productData = productSnapshot.data() as Product;
            productData.id = productData.id;
            if (productData.image) {
                const image = ref(storage, "/accessories/" + productData.image.url);
                try {
                    const imageUrl = await getDownloadURL(image);
                    productData.image.url = imageUrl;
                    if (productData.images && productData.images?.length >= 0) {
                        for (const img of productData.images) {
                            const imagesRef = ref(storage, "/accessories/" + img.url);
                            try {
                                const imagesUrl = await getDownloadURL(imagesRef);
                                img.url = imagesUrl;
                            } catch (error) {
                                console.error('Error al obtener la URL de descarga ', productData.id, ':', error);
                            }
                        }
                    }
                }
                catch (error) {
                    console.error('Error al obtener la URL de descarga de la imagen para el producto', productData.id, ':', error);
                    // En caso de error, eliminar el campo de imagen
                    delete productData.image;
                }
            }
            return productData;
        }
        return null;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}


export function generateRandomId() {
    return Math.random().toString(36).substring(2); // Este es un ejemplo básico de generación de IDs aleatorios
}