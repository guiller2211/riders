import type { Region } from '@ducati/types';

import {
  CA_REGION_ATLANTIC,
  CA_REGION_CENTRAL,
  CA_REGION_PRAIRIES,
  CA_REGION_WESTCOAST,
} from './region_CA.constants';
import {
  US_REGION_NORTHEAST,
  US_REGION_NORTHWEST,
  US_REGION_SOUTHEAST,
  US_REGION_SOUTHWEST,
} from './region_US.constants';

export const REGIONS_US: Map<string, Region> = new Map<string, Region>([
  [US_REGION_NORTHWEST.isocode, US_REGION_NORTHWEST],
  [US_REGION_SOUTHWEST.isocode, US_REGION_SOUTHWEST],
  [US_REGION_NORTHEAST.isocode, US_REGION_NORTHEAST],
  [US_REGION_SOUTHEAST.isocode, US_REGION_SOUTHEAST],
]);

export const REGIONS_CA: Map<string, Region> = new Map<string, Region>([
  [CA_REGION_ATLANTIC.isocode, CA_REGION_ATLANTIC],
  [CA_REGION_CENTRAL.isocode, CA_REGION_CENTRAL],
  [CA_REGION_PRAIRIES.isocode, CA_REGION_PRAIRIES],
  [CA_REGION_WESTCOAST.isocode, CA_REGION_WESTCOAST],
]);
