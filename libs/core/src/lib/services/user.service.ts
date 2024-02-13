import type { User } from '@ducati/types';

import { AbstractService } from './service';

export abstract class UserService extends AbstractService {
  static TYPE = 'userService';

  protected constructor(type?: string) {
    super(type ?? UserService.TYPE);
  }

  abstract getUserById(userId: string): Promise<User | Error>;

  abstract createAnonymousUser(): Promise<User>;
}
