import { useFetcher, useLoaderData } from '@remix-run/react';
import { LoginView, View, useResponsiveClientValue } from '@riders/ui';
import { FormEvent, useState } from 'react';
import { loginWithEmailAndPassword } from '../../service/login.service';

export const LoginPage = () => {
    const fetcher = useFetcher();
    const { csrfToken } = useLoaderData(); // Carga el token CSRF desde el loader
    const [isLoading, setIsloading] = useState(false);
    const [notification, setNotification] = useState<string>("");

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsloading(true);

        const formData = new FormData(e.currentTarget);
        formData.append('csrfToken', csrfToken); // Añade el token CSRF al FormData

        const email: string = formData.get('email') as string;
        const passwordField = e.currentTarget.elements.namedItem('password') as HTMLInputElement;
        const password: string = passwordField.value;
        const authResult = await loginWithEmailAndPassword(email, password);

        if (authResult && authResult.success) {
            await fetcher.submit({ __session: authResult.__session, "email-login": true, csrfToken }, { method: "post" });
        } else {
            setNotification(authResult ? authResult.error : "error");
            setIsloading(false);
        }
    };

    return (
        <View gap={10} paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}>
            <LoginView
                sendForm={submitForm}
                notification={notification}
                isLoading={isLoading}
            />
        </View>
    );
};
