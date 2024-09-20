import { CurrencySymbolPosition, ProductData, ProductVariant, } from "@riders/types";

export class getProduct {
    static getAddProduct(formData: FormData) {
        const category = formData.get('category') as string;
        const imgDefault = formData.get('imgDefault') as unknown as number;
        const colors = formData.getAll('color') as string[];
        const sizes = formData.getAll('size') as string[];
        const imageEntries: FormDataEntryValue[] = formData.getAll('image');
        const images: File[] = imageEntries.filter(entry => entry instanceof File) as File[];
        const price = formData.get('price') as unknown as number;
        const description = formData.get('description') as string;
        const productName = formData.get('productName') as string;
        const available = formData.get('available') as string;
        const active: boolean = available === "true";
        const stock = formData.get('stock') as unknown as number;
        const sku = formData.get('sku') as string;
        const id = generateRandomId();
        const nameImage = productName.split(' ').join('');

        const imageArray = images
            .filter((image: File) => image.name.trim() !== '')
            .map((image: File, index: number) => {
                const format = image.name.split('.').pop();
                const imageFileName = `${nameImage}-${index}.${format}`;
                const defaultImg = imgDefault == index;
                return {
                    id: '',
                    url: `${nameImage}/${imageFileName}`,
                    label: productName,
                    dimensions: {
                        width: 350,
                        height: 350
                    },
                    default: defaultImg
                };
            });
        const variants: ProductVariant[] = [];

        colors.forEach(color => {
            variants.push({
                id: color, 
                name: ''
            });
        });

        
        sizes.forEach(size => {
            variants.push({
                id: size, 
                name: ''
            });
        });

        const product: ProductData = {
            id: '',
            name: productName,
            description: description,
            categories: {
                id: category,
                name: category,
            },
            variants: variants,
            value: {
                centsAmount: price,
                currency: {
                    isocode: 'es-CL',
                    name: 'CLP',
                    symbol: '$',
                    symbolPosition: CurrencySymbolPosition.BEFORE,
                    decimalPlaces: 3,
                }
            },
            sku: sku,
            image: imageArray,
            stock: {
                id: '',
                available: true,
                quantity: stock,
            },
            active: active
        };

        return product;
    }

}

export function generateRandomId() {
    return Math.random().toString(36).substring(2); 
}