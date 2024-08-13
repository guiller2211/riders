import { collection, getDocs, query, where } from "firebase/firestore";
import { CategoryData, ProductVariantData } from "@riders/types";
import { db } from "@riders/firebase";
import { FacetValueTypeEnum } from "@riders/ui";

export async function getCategories() {
  try {
    const categoriesData = await getCategoriesData();
    const productVariants = await getProductVariants();

    return { categoriesData, productVariants };
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

export async function getCategoriesData() {
  const categoriesSnapshot = await getDocs(collection(db, "category"));

  const categoriesData: CategoryData[] = await Promise.all(
    categoriesSnapshot.docs.map(async (doc) => {
      const categoryData = doc.data() as CategoryData;
      categoryData.id = doc.id;

      const { id, name, ...rest } = categoryData;
      return { id, name, ...rest };
    }));


  return categoriesData;
}

export async function getVariantsData() {
  const variantsSnapshot = await getDocs(collection(db, "variants"));

  const variantsData: ProductVariantData[] = await Promise.all(
    variantsSnapshot.docs.map(async (doc) => {
      const variantData = doc.data() as ProductVariantData;
      variantData.id = doc.id;

      let subvariant = variantData.subvariant?.map((sv) => {
        const { id, name } = sv;
        return { id, name };
      });

      const { id, type } = variantData;
      return { id, subvariant, type };
    })
  );

  return variantsData;
}

async function getProductVariants() {
  const variantsSnapshot = await getDocs(collection(db, "variants"));
  const variantsData = variantsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().variants }));
  return variantsData;
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

