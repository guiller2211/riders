import type { UIComposedType } from '@ducati/types';

import type { AppStrategy } from '../strategy';

export const HOMEPAGE_TYPE = 'HomePage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomepageStrategyParams {}

export interface HomepageStrategyResult {
  [key: string]: UIComposedType;
}

export type HomepageStrategy = AppStrategy<
  HomepageStrategyParams,
  HomepageStrategyResult
>;
