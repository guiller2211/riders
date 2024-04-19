import { getDocs, collection, doc, getDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import { db, storage } from "../utils/firebase.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ProductData } from "@ducati/types";
import { getProduct as getProductUtil } from "@ducati/ui";


export async function getProduct() {
    try {
        const productsSnapshot = await getDocs(collection(db, "product"));

        const productsData: ProductData[] = await Promise.all(
            productsSnapshot.docs.map(async (doc) => {
                const productData = doc.data() as ProductData;
                productData.id = doc.id;
                if (productData.image && productData.image.length > 0) {
                    const imagePromises = productData.image.map(async (image) => {
                        if (!image.url.startsWith('http')) { // Verificar que la URL no comience con 'http'
                            const imageRef = ref(storage, "/product/" + image.url);
                            const imageUrl = await getDownloadURL(imageRef);
                            image.url = imageUrl;
                        }
                        return image; // Retornamos la imagen modificada
                    });

                    const resolvedImages = await Promise.all(imagePromises);

                    productData.image = resolvedImages.filter(image => image !== null);
                }
                const { id, name, categories, sku, active, ...rest } = productData;
                return { id, name, categories, sku, active, ...rest };
            }));

        return productsData;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

export async function getProductById(uid?: string) {
    try {
        if (uid) {
            const productRef = doc(db, "product", uid);
            const productSnapshot = await getDoc(productRef);
            const productData = productSnapshot.data() as ProductData;

            if (productData) {
                productData.id = productSnapshot.id;

                if (productData.image && productData.image.length > 0) {
                    const imagePromises = productData.image.map(async (image) => {
                        if (!image.url.startsWith('http')) { // Verificar que la URL no comience con 'http'
                            const imageRef = ref(storage, "/product/" + image.url);
                            const imageUrl = await getDownloadURL(imageRef);
                            image.url = imageUrl;
                        }
                        return image; // Retornamos la imagen modificada
                    });

                    const resolvedImages = await Promise.all(imagePromises);

                    productData.image = resolvedImages.filter(image => image !== null);
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

export async function getProductBySku(skuId?: string) {
    try {
        if (skuId) {
            const productQuery = query(collection(db, "product"), where("sku", "==", skuId));
            const productSnapshot = await getDocs(productQuery);

            if (productSnapshot.empty) return null; // Verificar si no hay documentos

            const productData = productSnapshot.docs[0].data() as ProductData; // Obtener el primer documento
            productData.id = productSnapshot.docs[0].id;


            if (productData.image && productData.image.length > 0) {
                const imagePromises = productData.image.map(async (image) => {
                    if (!image.url.startsWith('http')) { // Verificar que la URL no comience con 'http'
                        const imageRef = ref(storage, "/product/" + image.url);
                        const imageUrl = await getDownloadURL(imageRef);
                        image.url = imageUrl;
                    }
                    return image; // Retornamos la imagen modificada
                });

                const resolvedImages = await Promise.all(imagePromises);

                productData.image = resolvedImages.filter(image => image !== null);
            }

            return productData;
        }
        return null;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}



export async function addProduct(formData: FormData) {
    try {
        const product = getProductUtil.getAddProduct(formData);
        const productName = formData.get('productName') as string;
        const image = formData.get('image') as File;

        const format = image.name.split('.').pop();
        const nameImage = productName.replace(/\s+/g, ''); // Eliminar espacios en blanco
        const imageFileName = `${nameImage}.${format}`;

        const productDocRef = await addDoc(collection(db, 'product'), product);
        const productId = productDocRef.id;

        await Promise.all([
            addDoc(collection(db, 'price'), {
                ...product.value,
                value: product.value,
                productId: productId
            }),
            addDoc(collection(db, 'image'), {
                id: productId,
                url: `${nameImage}/${imageFileName}`,
                label: productName,
                dimensions: {
                    width: 350,
                    height: 350
                },
                default: false
            }),
            addDoc(collection(db, 'stock'), {
                ...product.stock,
                productId: productId
            }),
            updateDoc(doc(db, "product", productId), {
                id: productId,
                price: { ...product.value, id: productId },
                categories: { ...product.categories, id: productId },
                image: product.image?.map(image => ({ ...image, id: productId })),
                stock: { ...product.stock, productId: productId }
            })
        ]);

        const imageRef = ref(storage, `product/${nameImage}/${imageFileName}`);
        await uploadBytes(imageRef, image);

        return {
            success: true,
            message: `Documento '${productDocRef.id}' escrito exitosamente`
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al agregar productos:',
            error: error
        };
    }
}


export function generateRandomId() {
    return Math.random().toString(36).substring(2); // Este es un ejemplo básico de generación de IDs aleatorios
}