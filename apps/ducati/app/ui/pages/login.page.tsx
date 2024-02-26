import { action, loader } from '../../routes/login';
import { useActionData, useLoaderData, useNavigation, useSubmit } from '@remix-run/react';
import { LoginView, View, useResponsiveClientValue } from '@ducati/ui';
import { FormEvent } from 'react';


export const LoginPage = () => {
    const { layout, getProduct } = useLoaderData<typeof loader>();
    const { result, error  } = useActionData<typeof action>() ?? {};
    const submit = useSubmit();
    const navigation = useNavigation();

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        submit(e.currentTarget);
    };

    return (
        <View gap={10}  paddingInline={useResponsiveClientValue({ s: 10,l: 20 })}>
            <LoginView
                sendForm={submitForm}
                notification={result}
                isLoading={navigation.state === 'idle' ? false : true}
            />
        </View>
    );
};
