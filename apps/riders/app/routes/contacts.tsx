import { ContactPage } from '../ui/pages/contacts.page';
import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { Meta } from '@riders/types';
import { RemixUtils } from "../../framework/utils.server";

export async function loader({ request }: LoaderArgs) {
    const logger: Logger<ILogObj> = new Logger({ name: 'Contact.tsx' });

    const meta: Meta = await RemixUtils.pageMeta(
        'Contacto',
    );

    return typedjson({ ...meta });
}


export default ContactPage;
export { meta };
export { ErrorBoundary };
