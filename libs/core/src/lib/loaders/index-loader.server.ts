import type {
  ProductsCarouselProps,
  UIComposedType,
  CommerceFeaturesProps,
} from '@ducati/types';

import type { Registry } from '..';
import type { LoaderResult } from './loaders.server';
import { AbstractLoader } from './loaders.server';
import type {
  HomepageStrategy,
  HomepageStrategyParams,
  HomepageStrategyResult,
} from '../strategies/homepage/homepage.strategy';
import { HOMEPAGE_TYPE } from '../strategies/homepage/homepage.strategy';

const ROUTE_NAME = 'home';

export interface HomepageData {
  [key: string]: UIComposedType | CommerceFeaturesProps | ProductsCarouselProps;
}

export class IndexLoader extends AbstractLoader<HomepageData> {
  async load(
    request: Request,
    appRegistry: Registry,
  ): Promise<LoaderResult<HomepageData>> {
    // Use type annotation for strategy and homepageResult
    const strategy: HomepageStrategy = appRegistry.getStrategy<
      HomepageStrategyParams,
      HomepageStrategyResult,
      HomepageStrategy
    >(HOMEPAGE_TYPE);
    
    // Add comments for better understanding
    // Execute the strategy to get the homepage data
    const homepageResult: HomepageStrategyResult = await strategy.execute();

    // Generate the loader result
    return this.generateResult(homepageResult, request, appRegistry, ROUTE_NAME);
  }
}
