import type { Resource } from '../resource';
import type { Address } from './address';

export interface User extends Resource {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isEmailVerified?: boolean;
  addresses?: Address[];
  anonymous: boolean;
}

export interface UserGroup extends Resource {
  name?: string;
}
