import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../server/firebase.service";
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

export const createAccount = async (user: Customer, password: string) => {
    try {
        if (!user.email || !password || typeof user.email !== 'string' || typeof password !== 'string') {
            throw new Error('Invalid email or password');
        }

        const authResp = await createUserWithEmailAndPassword(auth, user.email, password);

        if (authResp) {
            const customer: Customer = { ...user, id: authResp.user.uid }

            await setCustomer(customer);
            return await loginWithEmailAndPassword(user.email, password);
        }
    } catch (err: any) {
        console.error("signInWithEmailAndPassword Error:", err);
        return {
            error: err.message // Retorna el mensaje de error en caso de fallo
        };
    }
    return null;
};

export async function forgotPassword(email: string) {
    try {
        const request = await sendPasswordResetEmail(auth, email);
        return {
            result: true,
            message: 'Correo Enviado'
        }
    } catch (error) {
        console.error("sendPasswordResetEmail Error:", error);
        return {
            result: false,
            message: `${error}`
        }
    }

}