import { collection, getDocs } from "firebase/firestore";
import { CategoryData } from "@ducati/types";
import { db } from "@ducati/firebase";

export async function getCategories() {
    try {
        const categoriesData = await getCategoriesData();
        const productVariantsData = await getProductVariantsData();

        return { categoriesData, productVariantsData };
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

async function getCategoriesData() {
    const categoriesSnapshot = await getDocs(collection(db, "category"));

    return await Promise.all(categoriesSnapshot.docs.map(async (doc) => {
        const categoryData = doc.data() as CategoryData;
        categoryData.id = doc.id;

        return categoryData;
    }));
}

async function getProductVariantsData() {
    const productVariantsSnapshot = await getDocs(collection(db, "productVariant"));

    return await Promise.all(productVariantsSnapshot.docs.map(async (doc) => {
        const productVariantsData = doc.data() ;
        
        return productVariantsData;
    }));
}
