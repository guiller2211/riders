import { ImageData } from "@riders/types";

export class getImage {
    static getAddImage(formData: FormData): ImageData {
        const imageEntry = formData.get('image') as File | null;

        if (imageEntry && imageEntry.name.trim() !== '') {
            const sanitizedFileName = imageEntry.name.replace(/\s+/g, '');

            return {
                id: '',
                url: sanitizedFileName,
                label: sanitizedFileName,
                dimensions: {
                    width: 350,
                    height: 350
                },
                default: true,
                islayout: true
            };
        }

        throw new Error('No valid image provided');
    }
}