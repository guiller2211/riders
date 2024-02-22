import { LoginPage } from '../ui/pages/login.page';
import { typedjson } from 'remix-typedjson';
import { supabase } from '../../utils/supabase';
import { LayoutUtils } from '../../framework/layout.server';
import { redirect, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { commitSession, getSession } from '../../utils/session.server';

export async function loader({ }: LoaderArgs) {
    const layout = LayoutUtils.getLayout();

    const { data: products, error } = await supabase.from('products').select();

    if (error) {
        throw error;
    }

    return typedjson({
        layout,
        getProduct: products ?? [],
    });
}

export async function action({ request, context: { registry } }: ActionArgs) {
    const formData: FormData = await request.formData();
    const email: FormDataEntryValue | null = formData.get('email');
    const password: FormDataEntryValue | null = formData.get('password');

    if (
        !email ||
        !password ||
        typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return typedjson({ result: 'login.checkCredentials' });
    }

    let { data: user, error } = await supabase.auth.signInWithPassword({
        email: email.toString(),
        password: password.toString()
    });

    if (user) {
        // get session and set access_token
        let session = await getSession(request.headers.get("Cookie"));
        session.set("access_token", user.session?.access_token);

        // redirect to page with the cookie set in header
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    // else return the error
    return typedjson({
        result: (error as Error).message,
      });
}
export default function Index() {
    return <LoginPage />;
}
