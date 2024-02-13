import type { Meta, Page } from '@ducati/types';

import type { Registry } from '..';
import { CmsService, SessionService } from '../services';
import type { LoaderResult } from './loaders.server';
import { AbstractLoader } from './loaders.server';
import { ResponseUtils } from '../utils/response.utils';

const ROUTE_NAME = 'content';

export class ContentLoader extends AbstractLoader<Page> {
  async load(
    request: Request,
    appRegistry: Registry,
    pageSlug: string,
  ): Promise<LoaderResult<Page>> {
    const sessionService: SessionService =
      appRegistry.getService<SessionService>(SessionService.TYPE);
    const session = await sessionService.getSession(request);

    // CMS Page Retrieval
    const cmsService: CmsService = appRegistry.getService<CmsService>(
      CmsService.TYPE,
    );
    let page: Page | null = await cmsService.getPage(session.locale, pageSlug);

    if (!page) {
      page = this.handlePageNotFound(appRegistry, pageSlug);
    }

    return this.generateResult(
      page,
      request,
      appRegistry,
      ROUTE_NAME,
      (meta: Meta) => {
        meta.title = page?.title.concat(' | ').concat(meta.title) ?? '';
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected handlePageNotFound(appRegistry: Registry, slug: string): Page {
    throw ResponseUtils.jsonResp(`Page Not Found!`, { status: 404 });
  }
}
