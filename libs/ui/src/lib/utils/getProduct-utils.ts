import { CurrencySymbolPosition, ProductData, ProductEnum } from "@ducati/types";

export class getProduct {
    static getAddProduct(formData: FormData) {
        const type = formData.get('type') as ProductEnum;
        const image = formData.get('image') as File;
        const price = formData.get('price') as unknown as number;
        const description = formData.get('description') as string;
        const productName = formData.get('productName') as string;
        const stock = formData.get('stock') as unknown as number;
        const sku = formData.get('sku') as string;
        const id = generateRandomId();
        const formart = image.name.split('.').pop();
        const nameImage = productName.split(' ').join('');
        const imageFileName = `${nameImage}.${formart}`;

        const product: ProductData = {
            id: '',
            name: productName,
            description: description,
            type: type,
            categories: {
                id: '',
                name: 'Naked',
                description: 'Deportivas'
            },
            price: {
                id: '',
                productId: id,
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
            },
            sku: sku,
            image: [{
                id: '',
                url: nameImage + "/" + imageFileName,
                label: productName,
                dimensions: {
                    width: 350,
                    height: 350
                },
                default: false
            }],
            stock: {
                productId: '',
                available: true,
                quantity: stock,
            }
        };

        return product;
    }

}

export function generateRandomId() {
    return Math.random().toString(36).substring(2); // Este es un ejemplo básico de generación de IDs aleatorios
}