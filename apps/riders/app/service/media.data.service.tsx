import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import type { ImageData, ProductData } from '@riders/types';

import { db, storage } from "@riders/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getImage } from "@riders/ui";



export async function getMediaLayout(): Promise<ImageData | null> {
  try {
    const imagesSnapshot = await getDocs(collection(db, "image"));

    const layoutImageDoc = imagesSnapshot.docs.find((doc) => {
      const imageData = doc.data() as ImageData;
      return imageData.islayout === true;
    });

    if (!layoutImageDoc) {
      return null;
    }

    const imageData = layoutImageDoc.data() as ImageData;
    imageData.id = layoutImageDoc.id;

    const storagePath = imageData.url.startsWith('http')
      ? imageData.url.split("/o/")[1].split("?alt=")[0]
      : "/logo/" + imageData.url;

    const desertRef = ref(storage, decodeURIComponent(storagePath));
    imageData.url = await getDownloadURL(desertRef);

    const { id, description, url, ...rest } = imageData;
    return { id, description, url, ...rest };
  } catch (error) {
    console.error("Error al obtener la imagen de layout:", error);
    throw error;
  }
}
