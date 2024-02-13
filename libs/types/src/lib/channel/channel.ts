import type { Resource } from '../resource';

export interface Channel extends Resource {
  name?: string;
  description?: string;
}
