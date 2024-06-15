import { collection, getDocs, query, where } from "firebase/firestore";
import { CategoryData } from "@riders/types";
import { db } from "@riders/firebase";
import { FacetValueTypeEnum } from "@riders/ui";

export async function getCategories() {
    try {
        const categoriesData = await getCategoriesData();
        const productVariantsSizesData = await getProductVariantsSizesData();
        const productVariantsColorsData = await getProductVariantsColorsData();

        return { categoriesData, productVariantsSizesData, productVariantsColorsData };
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

export async function getCategoriesData() {
    const categoriesSnapshot = await getDocs(collection(db, "category"));
    const categoriesData: CategoryData[] = [];

    for (const doc of categoriesSnapshot.docs) {
        const categoryData = doc.data() as CategoryData;
        categoryData.id = doc.id;
        categoriesData.push(categoryData);
    }

    return categoriesData;
}
export async function getCategoriesWithProductData() {
    const categoriesSnapshot = await getDocs(collection(db, "category"));
    const categoriesData: CategoryData[] = [];
  
    for (const categoryDoc of categoriesSnapshot.docs) {
      const categoryData = categoryDoc.data() as CategoryData;
      categoryData.id = categoryDoc.id;
  
      const allProductsSnapshot = await getDocs(collection(db, "product"));
      let productCount = 0;
  
      allProductsSnapshot.forEach(productDoc => {
        const productData = productDoc.data();
        if (productData.categories && productData.categories.id === categoryData.id) {
          productCount++;
        }
      });
  
      categoryData.productCount = productCount;
      categoriesData.push(categoryData);
    }
  
    const values = categoriesData.map(category => ({
      name: category.type!,
      type: FacetValueTypeEnum.Link,
      quantity: category.productCount || 0
    }));
  
    return values;
  }
  

async function getProductVariantsSizesData() {
    const sizeSnapshot = await getDocs(collection(db, "size"));
    const sizeData = sizeSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().size }));
    return sizeData;
}

async function getProductVariantsColorsData() {
    const colorSnapshot = await getDocs(collection(db, "color"));
    const colorData = colorSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().color }));
    return colorData;
}
