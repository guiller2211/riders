import { getDocs, collection, doc, getDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import { db, storage } from "../utils/firebase.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ProductData, TypeVariamEnum } from "@ducati/types";
import { getProduct as getProductUtil } from "@ducati/ui";


export function getProduct() {
    return getDocs(collection(db, "product"))
        .then(productsSnapshot => {
            return Promise.all(
                productsSnapshot.docs.map(doc => {
                    const productData = doc.data() as ProductData;
                    productData.id = doc.id;
                    if (productData.image && productData.image.length > 0) {
                        const imagePromises = productData.image.map(async (image) => {
                            if (!image.url.startsWith('http')) {
                                const imageRef = ref(storage, "/product/" + image.url);
                                const imageUrl = await getDownloadURL(imageRef);
                                image.url = imageUrl;
                            }
                            return image;
                        });

                        return Promise.all(imagePromises)
                            .then(resolvedImages => {
                                productData.image = resolvedImages.filter(image => image !== null);
                                const { id, name, categories, sku, active, ...rest } = productData;
                                return { id, name, categories, sku, active, ...rest };
                            });
                    } else {
                        const { id, name, categories, sku, active, ...rest } = productData;
                        return Promise.resolve({ id, name, categories, sku, active, ...rest });
                    }
                })
            );
        })
        .then(productsData => {
            return productsData.filter(_p => _p.active);
        })
        .catch(error => {
            console.error("Error al obtener productos:", error);
            throw error;
        });
}


async function getProductColors() {
    const colorSnapshot = await getDocs(collection(db, "color"));
    return colorSnapshot.docs.reduce((acc: any, doc) => {
        acc[doc.id] = doc.data().color;
        return acc;
    }, {});
}

async function getProductSizes() {
    const sizeSnapshot = await getDocs(collection(db, "size"));
    return sizeSnapshot.docs.reduce((acc: any, doc) => {
        acc[doc.id] = doc.data().size;
        return acc;
    }, {});
}

async function getProductImages(images: any[]) {
    const imagePromises = images.map(async (image) => {
        if (!image.url.startsWith('http')) {
            const imageRef = ref(storage, "/product/" + image.url);
            const imageUrl = await getDownloadURL(imageRef);
            return { ...image, url: imageUrl };
        }
        return image;
    });
    return await Promise.all(imagePromises);
}

export function getProductById(uid?: string): Promise<ProductData | null> {
    return new Promise(async (resolve, reject) => {
        try {
            if (uid) {
                const productRef = doc(db, "product", uid);
                const productSnapshot = await getDoc(productRef);
                const productData = productSnapshot.data() as ProductData;

                if (productData) {
                    productData.id = productSnapshot.id;

                    const colors = await getProductColors();
                    const sizes = await getProductSizes();

                    productData.variants?.forEach((variant) => {
                        if (colors.hasOwnProperty(variant.id)) {
                            variant.name = colors[variant.id];
                            variant.type = TypeVariamEnum.Color
                        }
                        if (sizes.hasOwnProperty(variant.id)) {
                            variant.name = sizes[variant.id];
                            variant.type = TypeVariamEnum.Size
                        }
                    });

                    if (productData.image && productData.image.length > 0) {
                        productData.image = await getProductImages(productData.image);
                    }

                    resolve(productData);
                }
            }
            resolve(null);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            reject(error);
        }
    });
}

export function getProductBySku(skuId?: string): Promise<ProductData | null> {
    return new Promise(async (resolve, reject) => {
        try {
            if (skuId) {
                const productQuery = query(collection(db, "product"), where("sku", "==", skuId));
                const productSnapshot = await getDocs(productQuery);

                if (productSnapshot.empty) {
                    resolve(null); // Verificar si no hay documentos
                } else {
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

                    resolve(productData);
                }
            }
            resolve(null);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            reject(error);
        }
    });
}

export function addProduct(formData: FormData): Promise<{ success: boolean, message: string }> {
    return new Promise(async (resolve, reject) => {
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

            resolve({
                success: true,
                message: `Documento '${productDocRef.id}' escrito exitosamente`
            });
        } catch (error) {
            reject({
                success: false,
                message: 'Error al agregar productos:',
                error: error
            });
        }
    });
}


export function generateRandomId() {
    return Math.random().toString(36).substring(2); // Este es un ejemplo básico de generación de IDs aleatorios
}