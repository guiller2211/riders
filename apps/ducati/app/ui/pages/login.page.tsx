import { useFetcher, useNavigation, useSubmit } from '@remix-run/react';
import { LoginView, View, useResponsiveClientValue } from '@ducati/ui';
import { FormEvent, useState } from 'react';
import { loginWithEmailAndPassword } from '../../service/login.service';

export const LoginPage = () => {
    const navigation = useNavigation();
    const fetcher = useFetcher();
    const [isLoading, setIsloading] = useState(false)
    const [notification, setNotification] = useState<string>("");

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsloading(true);

        const formData = new FormData(e.currentTarget);
        const email: string = formData.get('email') as string;
        const password: string = formData.get('password') as string;

        const authResult = await loginWithEmailAndPassword(email, password);

        if (authResult && authResult.success) {
            await fetcher.submit({ __session: authResult.__session, "email-login": true }, { method: "post" });
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
