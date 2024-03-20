import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../utils/firebase.service";
import { setCustomer } from "./user.data.service";
import { Customer } from "@ducati/types";

export const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('Invalid email or password');
        }

        const authResp: UserCredential = await signInWithEmailAndPassword(auth, email, password);

        if (authResp) {
            const __session = await auth.currentUser?.getIdToken();

            return {
                __session: __session || '', // Manejar el caso en que __session sea undefined
                uid: authResp.user.uid,
                success: true
            };
        }
    } catch (err: any) {
        console.error("signInWithEmailAndPassword Error:", err);
        return {
            error: err.message // Retorna el mensaje de error en caso de fallo
        };
    }
    return null;
};

export const createAccount = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('Invalid email or password');
        }

        const authResp = await createUserWithEmailAndPassword(auth, email, password);

        if (authResp) {
            const customer: Customer = {
                id: authResp.user.uid,
                firstName,
                lastName,
                email,
                anonymous: false,
                lastModifiedAt: Date.now().toString() 
            };

            await setCustomer(customer);
           return await loginWithEmailAndPassword(email, password);
        }
    } catch (err: any) {
        console.error("signInWithEmailAndPassword Error:", err);
        return {
            error: err.message // Retorna el mensaje de error en caso de fallo
        };
    }
    return null;
};