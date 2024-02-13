import type { UIComposedType } from '@ducati/types';

import type {
  HomepageStrategy,
  HomepageStrategyParams,
  HomepageStrategyResult,
} from '.';
import { HOMEPAGE_TYPE } from '.';
import type { AppStrategy } from '../strategy';
import { AbstractCompositeStrategy } from '../strategy';

export class CompositeHomepageStrategy
  extends AbstractCompositeStrategy<
    HomepageStrategyParams,
    UIComposedType,
    HomepageStrategyResult
  >
  implements HomepageStrategy
{
  constructor(
    strategies: AppStrategy<HomepageStrategyParams, UIComposedType>[],
  ) {
    super(HOMEPAGE_TYPE, strategies);
  }

  override reduce(
    ret: HomepageStrategyResult,
    strategy: AppStrategy<HomepageStrategyParams, UIComposedType>,
    result: UIComposedType,
  ): HomepageStrategyResult {
    ret[strategy.TYPE] = result;
    return ret;
  }
}
