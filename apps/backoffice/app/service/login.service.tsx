import {  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../utils/firebase.service";

import { collection,getDocs, query, where } from "firebase/firestore";


export async function sendOTP(phone: string) {
    const cleanedPhone = phone.replace(/\s+/g, '');

    try {
        const q = query(collection(db, 'adminUser'), where('fullNumber', '==', cleanedPhone));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            await new Promise(resolve => setTimeout(resolve, 10000));

            const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
            recaptcha.render();
            return signInWithPhoneNumber(auth, phone, recaptcha);
        }

        return null;
    } catch (error) {
        throw new Error(`Error al obtener el usuario con número '${cleanedPhone}': ${error}`);
    }
}
