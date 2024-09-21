import type { Meta } from '@riders/types';

export class RemixUtils {
  static async pageMeta(
    namespace?: string,
  ): Promise<Meta> {
    return {
      title: namespace ?? '',
      description: '',
    };
  }
}
