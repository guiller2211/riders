import type { Customer, Session } from '@ducati/types';

import { AbstractService } from './service';

export abstract class AuthenticationService extends AbstractService {
  static TYPE = 'authenticationService';

  protected constructor(type?: string) {
    super(type ?? AuthenticationService.TYPE);
  }

  // TODO: include anonymousCartId and  anonymousCartSignInMode: "MergeWithExistingCustomerCart" if anonymous cart id exists
  abstract authenticate(
    username: string,
    password: string,
    anonymousId?: string,
    anonymousCartId?: string,
    anonymousCartSignInMode?: string,
    session?: Session,
  ): Promise<Customer | Error>;
}
