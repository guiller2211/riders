import { CurrencySymbolPosition, ProductData, } from "@backoffice/types";
import { CategoryData } from "@backoffice/types";

export class getProduct {
    static getAddProduct(formData: FormData) {
        const category = formData.get('category') as string;
        const color = formData.get('color') as string;
        const size = formData.get('size') as string;
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
            .filter((image: File) => image.name.trim() !== '') // Filtrar imágenes con nombres no vacíos
            .map((image: File, index: number) => {
                const format = image.name.split('.').pop();
                const imageFileName = `${nameImage}-${index}.${format}`;

                return {
                    id: '',
                    url: `${nameImage}/${imageFileName}`,
                    label: productName,
                    dimensions: {
                        width: 350,
                        height: 350
                    },
                    default: false
                };
            });


        const product: ProductData = {
            id: '',
            name: productName,
            description: description,
            categories: {
                id: category,
                name: category,
            },
            variants: [
                {
                    id: '',
                    name: color
                },
                {
                    id: '',
                    name: size
                }
            ],
            value: {
                centsAmount: price,
                currency: {
                    isocode: 'CHL',
                    name: 'CHL',
                    symbol: 'CHL',
                    symbolPosition: CurrencySymbolPosition.BEFORE,
                    decimalPlaces: 2,
                }
            },
            sku: sku,
            image: imageArray,
            stock: {
                productId: '',
                available: true,
                quantity: stock,
            },
            active: active
        };

        return product;
    }

}

export function generateRandomId() {
    return Math.random().toString(36).substring(2); // Este es un ejemplo básico de generación de IDs aleatorios
}