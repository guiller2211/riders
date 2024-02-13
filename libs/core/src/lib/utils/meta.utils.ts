import type { Meta } from '@ducati/types';

import type { ConfigService } from '../services';

export class MetaUtils {
  static async pageMeta(
    configService: ConfigService,
    request: Request,
    namespace?: string,
  ): Promise<Meta> {
    return {
      title: 'coming soon!',
      description: 'coming soon!',
    };
  }
}
