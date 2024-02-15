import ContentPage from '../ui/pages/content.page';
import { HeadersFunction, LoaderArgs } from '@remix-run/node';
import { ContentLoader, Registry, UrlUtils } from '@ducati/core';
import { typedjson } from 'remix-typedjson';

export const handle = { i18n: 'content' };

export async function loader({
  request,
  context: { registry },
  params,
}: LoaderArgs) {
  const appRegistry: Registry = registry as Registry;

  const pageSlug: string = UrlUtils.getLeafPath(request.url, false);
  const page = await new ContentLoader().load(request, appRegistry, pageSlug);

  const { response, ...result } = page;
  return typedjson(result, { ...page.response });
}

// Cache control for a "document request" (aka a direct reqeust to a page, not a navigation to the page)
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { 'Cache-Control': loaderHeaders.get('Cache-Control') ?? 'no-cache' };
};

export default ContentPage;
