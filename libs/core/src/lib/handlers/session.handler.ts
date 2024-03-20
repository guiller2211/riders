import type { InnerSession } from '@ducati/types';

export interface SessionHandler {
  getSession(request: Request): Promise<InnerSession>;

  commitSession(session: InnerSession): Promise<string>;

  destroySession(session: InnerSession): Promise<string>;
}
