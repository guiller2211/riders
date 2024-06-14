import { ContactPage } from '../ui/pages/contacts.page';
import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';

export async function loader({ request }: LoaderArgs) {
    const logger: Logger<ILogObj> = new Logger({ name: 'Contact.tsx' });

    return typedjson({});
}


export default ContactPage;
export { meta };
export { ErrorBoundary };
