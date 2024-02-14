import {
  SimpleDataSourceStrategy,
  type ConfigService,
  type Registry,
  ObjectDataSource,
  CompositeHomepageStrategy,
  FileSystemConfigService,
  RegistryBuilder,
} from '@ducati/core';

import path from 'path';
import ads from '../data/strategies/homepage/ads.json';
import commerceFeatures from '../data/strategies/homepage/commercefeatures.json';
import homepageHeroBanner from '../data/strategies/homepage/herobanner.json';
import newReleases from '../data/strategies/homepage/newreleases.json';
import shopByCategory from '../data/strategies/homepage/shopbycategory.json';
import topSellers from '../data/strategies/homepage/topsellers.json';

import { HOMEPAGE } from '../app/ui/pages/_pages.constants';
import { registry as clientRegistry } from './registry.client';

const configService: ConfigService = new FileSystemConfigService(
  path.join(path.resolve(process.cwd()), process.env.CONFIG_DIR ?? 'config'),
);

const appConfig = configService.getRequiredConfig();
const contentfulConfig = configService.getRequiredConfig('contentful');
const commercetoolsConfig = configService.getRequiredConfig('commercetools');
const cacheConfig = configService.getRequiredConfig('cache');

const homepageStrategies = [];
homepageStrategies.push(
  new SimpleDataSourceStrategy(HOMEPAGE.ADS1, new ObjectDataSource(ads.ad1)),
);
homepageStrategies.push(
  new SimpleDataSourceStrategy(HOMEPAGE.ADS2, new ObjectDataSource(ads.ad2)),
);
homepageStrategies.push(
  new SimpleDataSourceStrategy(
    HOMEPAGE.COMMERCE_FEATURES,
    new ObjectDataSource(commerceFeatures),
  ),
);
homepageStrategies.push(
  new SimpleDataSourceStrategy(
    HOMEPAGE.HERO_BANNER,
    new ObjectDataSource(homepageHeroBanner),
  ),
);
homepageStrategies.push(
  new SimpleDataSourceStrategy(
    HOMEPAGE.NEW_RELEASES,
    new ObjectDataSource(newReleases),
  ),
);
homepageStrategies.push(
  new SimpleDataSourceStrategy(
    HOMEPAGE.SHOP_BY_CATEGORY,
    new ObjectDataSource(shopByCategory),
  ),
);
homepageStrategies.push(
  new SimpleDataSourceStrategy(
    HOMEPAGE.TOP_SELLERS,
    new ObjectDataSource(topSellers),
  ),
);

export const registry: Registry = new RegistryBuilder(undefined, clientRegistry)
  // Core Services
  .registerService(configService)
  .registerStrategy(new CompositeHomepageStrategy(homepageStrategies))
  .build();
