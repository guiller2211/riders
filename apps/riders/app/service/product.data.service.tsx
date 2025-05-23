import { getDocs, collection, doc, getDoc, addDoc, updateDoc, query, where, DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImageData, ProductData, ProductVariant, ProductVariantData, } from "@riders/types";
import { getProduct as getProductUtil } from "@riders/ui";
import { db, storage } from "@riders/firebase";


export async function getProduct(): Promise<ProductData[]> {
    try {
        const productsSnapshot = await getDocs(collection(db, "product"));

        const productsData: ProductData[] = await Promise.all(
            productsSnapshot.docs.map(async (doc) => {
                const productData = doc.data() as ProductData;
                productData.id = doc.id;

                if (productData.image && productData.image.length > 0) {
                    const imagePromises = productData.image.map(async (image) => {
                        if (!image.url.startsWith('http')) {
                            const imageRef = ref(storage, `/product/${image.url}`);
                            try {
                                const imageUrl = await getDownloadURL(imageRef);
                                return { ...image, url: imageUrl };
                            } catch (error) {
                                console.error(`Error al obtener URL para la imagen ${image.url}:`, error);
                                return null;
                            }
                        }
                        return image;
                    });

                    const resolvedImages = await Promise.all(imagePromises);

                    productData.image = resolvedImages.filter((image): image is ImageData => image !== null);
                }

                const { id, name, categories, sku, active, ...rest } = productData;
                return { id, name, categories, sku, active, ...rest };
            })
        );

        return productsData.filter(product => product.active);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

export async function getProductByCategory(category?: string): Promise<ProductData[]> {
    try {
        const productsSnapshot = await getDocs(collection(db, "product"));

        const productsData: ProductData[] = await Promise.all(
            productsSnapshot.docs.map(async (doc) => {
                const productData = doc.data() as ProductData;
                productData.id = doc.id;

                if (productData.image && productData.image.length > 0) {
                    const imagePromises = productData.image.map(async (image) => {
                        if (!image.url.startsWith('http')) {
                            const imageRef = ref(storage, `/product/${image.url}`);
                            try {
                                const imageUrl = await getDownloadURL(imageRef);
                                return { ...image, url: imageUrl };
                            } catch (error) {
                                console.error(`Error al obtener URL para la imagen ${image.url}:`, error);
                                return null;
                            }
                        }
                        return image;
                    });

                    const resolvedImages = await Promise.all(imagePromises);

                    productData.image = resolvedImages.filter((image): image is ImageData => image !== null);
                }

                const { id, name, categories, sku, active, ...rest } = productData;
                return { id, name, categories, sku, active, ...rest };
            })
        );

        // Si se pasa una categoría, filtramos por la misma
        const filteredProducts = category
            ? productsData.filter(product => product.categories?.name == category && product.active)
            : productsData.filter(product => product.active);

        return filteredProducts;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
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

export async function getProductById(uid?: string): Promise<ProductData | null> {
    try {
        if (!uid) return null;

        const productRef = doc(db, "product", uid);
        const productSnapshot = await getDoc(productRef);

        if (!productSnapshot.exists()) return null;

        const productData = productSnapshot.data() as ProductData;
        productData.id = productSnapshot.id;

        if (productData.image && productData.image.length > 0) {
            productData.image = await resolveImageUrls(productData.image);
        }

        return productData;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

async function resolveImageUrls(images: ImageData[]): Promise<ImageData[]> {
    const imagePromises = images.map(async (image) => {
        if (!image.url.startsWith('http')) {
            const imageRef = ref(storage, "/product/" + image.url);
            image.url = await getDownloadURL(imageRef);
        }
        return image;
    });

    return await Promise.all(imagePromises);
}

export function getProductBySku(skuId?: string): Promise<ProductData | null> {
    return new Promise(async (resolve, reject) => {
        try {
            if (skuId) {
                const productQuery = query(collection(db, "product"), where("sku", "==", skuId));
                const productSnapshot = await getDocs(productQuery);

                if (productSnapshot.empty) {
                    resolve(null);
                } else {
                    const productData = productSnapshot.docs[0].data() as ProductData;
                    productData.id = productSnapshot.docs[0].id;

                    if (productData.image && productData.image.length > 0) {
                        const imagePromises = productData.image.map(async (image) => {
                            if (!image.url.startsWith('http')) {
                                const imageRef = ref(storage, "/product/" + image.url);
                                const imageUrl = await getDownloadURL(imageRef);
                                image.url = imageUrl;
                            }
                            return image;
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
    return Math.random().toString(36).substring(2);
}