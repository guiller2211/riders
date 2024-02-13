import { loader } from '../../routes/$';
import { useTypedLoaderData } from 'remix-typedjson';

export default function ContentPage() {
  const loaderData = useTypedLoaderData<typeof loader>();

  return (
    <main>
      <h1>{loaderData.data.title}</h1>
      <br />
      <div dangerouslySetInnerHTML={{ __html: loaderData.data.body }} />
    </main>
  );
}
