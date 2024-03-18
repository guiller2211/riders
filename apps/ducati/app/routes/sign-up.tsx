import { typedjson } from 'remix-typedjson';
import { SignUpPage } from '../ui/pages/sign-up.page';
import { ActionArgs, LoaderArgs } from '@remix-run/node';
import { sessionLogin } from '../utils/fb.sessions.server';

function getTitlesData() {
  return [
    { label: 'Mr.', value: '0' },
    { label: 'Ms.', value: '1' },
    { label: 'Mx.', value: '3' },
    { label: 'Mrs.', value: '4' },
    { label: 'Miss', value: '5' },
  ];
}

export async function action({ request, context: { registry } }: ActionArgs) {
  const formData: FormData = await request.formData();
  const __session: FormDataEntryValue | null = formData.get('__session');
  const uid: FormDataEntryValue | null = formData.get('uid');
  try {
    return await sessionLogin(request, __session as string, "/");
  } catch (error: any) {
    return { error: { message: error?.message } };
  }
}
export default function Index() {
  return <SignUpPage />;
}




