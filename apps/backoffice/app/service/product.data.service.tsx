import { getDocs, collection, doc, getDoc, addDoc, updateDoc, query, where, setDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../utils/firebase.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ProductData } from "@backoffice/types";
import { getProduct as getProductUtil } from "@backoffice/ui";


export async function getProduct() {
    try {
        const productsSnapshot = await getDocs(collection(db, "product"));

        const productsData: ProductData[] = await Promise.all(
            productsSnapshot.docs.map(async (doc) => {
                const productData = doc.data() as ProductData;
                productData.id = doc.id;
                if (productData.image && productData.image.length > 0) {
                    const imagePromises = productData.image.map(async (image) => {
                        const imageRef = ref(storage, "/product/" + image.url);
                        const imageUrl = await getDownloadURL(imageRef);
                        image.url = imageUrl;
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
                        const imageRef = ref(storage, "/product/" + image.url);
                        const imageUrl = await getDownloadURL(imageRef);
                        image.url = imageUrl;
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
                    const imageRef = ref(storage, "/product/" + image.url);
                    const imageUrl = await getDownloadURL(imageRef);
                    image.url = imageUrl;
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

export async function deleteProductById(uid: string) {

    try {
        await deleteDoc(doc(db, "product", uid));
        return await getProduct();
    } catch (error) {
        console.error(error);
    }
    return null;
}

export async function addProduct(formData: FormData) {
    try {
        const product = getProductUtil.getAddProduct(formData);
        const imagesFormData = formData.getAll('image');
        const image: File[] = Array.from(imagesFormData) as File[];

        const productRef = collection(db, 'product')
        const productDocRef = doc(productRef);
        await setDoc(productDocRef, product);

        const productId = productDocRef.id;

        await Promise.all([
            addDoc(collection(db, 'price'), {
                ...product.value,
                value: product.value,
                productId: productId
            }),

            addDoc(collection(db, 'stock'), {
                ...product.stock,
                productId: productId
            }),

            (await getDocs(collection(db, "category"))).docs.map((_id) => {
                if (product.categories?.id == _id.id) {
                    product.categories.id = _id.id;
                    product.categories.name = _id.data().type
                }
            }),
        ]);
        if (product.image) {
           
            const updatedImagesPromises = product.image.map(async (_img, index) => {
                const docRef = await addDoc(collection(db, 'image'), {
                    ..._img,
                    id: productId
                });
                _img.id = docRef.id;
                const imageRef = ref(storage, `product/${_img.url}`);
                await uploadBytes(imageRef, image[index]);
                return _img;
            });

            const updatedImages = await Promise.all(updatedImagesPromises);

            await updateDoc(doc(db, "product", productId), {
                id: productId,
                price: { ...product.value, id: productId },
                categories: { ...product.categories },
                image: updatedImages, 
                stock: { ...product.stock, productId: productId }
            });
        } else {
            await updateDoc(doc(db, "product", productId), {
                id: productId,
                price: { ...product.value, id: productId },
                categories: { ...product.categories },
                stock: { ...product.stock, productId: productId }
            });
        }


        const updateProduct = await getProduct();
        return {
            success: true,
            message: `Documento '${productDocRef.id}' escrito exitosamente`,
            data: updateProduct
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