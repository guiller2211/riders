import type { Session } from '@ducati/types';

import { AbstractService } from './service';

export abstract class SessionService extends AbstractService {
  static TYPE = 'sessionService';

  protected constructor(type?: string) {
    super(type ?? SessionService.TYPE);
  }

  abstract getSession(request: Request): Promise<Session>;

  abstract saveSession(session: Session, request: Request): Promise<string>;

  abstract destroySession(request: Request): Promise<string>;
}
