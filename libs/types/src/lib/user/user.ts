import type { Resource } from '../resource';
import type { AddressData } from './address';

export interface User extends Resource {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  isEmailVerified?: boolean;
  addresses?: AddressData[];
  addressID? : string;
  likeProduct?: string[]
  anonymous: boolean;
}