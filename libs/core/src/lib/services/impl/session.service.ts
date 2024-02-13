import type { InnerSession, Session, Store, User } from '@ducati/types';
import { ValidationError } from '@ducati/types';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

import type { UserService } from '..';
import { SessionService } from '..';
import type { SessionHandler } from '../../handlers';
import type { DataMapper } from '../../mappers';
import { SessionKeys } from '../../constants';

export class StoreScopedSessionService extends SessionService {
  private logger: Logger<ILogObj> = new Logger({
    name: 'AbstractSessionHandlerService',
  });

  protected sessionHandler: SessionHandler;

  protected storeScopedSessionMapper: DataMapper<
    Session,
    Map<string, string | undefined>
  >;

  protected userService: UserService;

  protected readonly store: Store;

  constructor(
    store: Store,
    sessionHandler: SessionHandler,
    storeScopedSessionMapper: DataMapper<
      Session,
      Map<string, string | undefined>
    >,
    userService: UserService,
  ) {
    super();
    this.store = store;
    this.sessionHandler = sessionHandler;
    this.storeScopedSessionMapper = storeScopedSessionMapper;
    this.userService = userService;
  }

  private async createSession(): Promise<Session> {
    const anonymousUser: User = await this.userService.createAnonymousUser();
    return {
      user: {
        id: anonymousUser.id,
        anonymous: anonymousUser.anonymous,
        guid: anonymousUser.systemId!,
      },
      country: this.store.defaultCountry,
      currency: this.store.defaultCurrency,
      locale: this.store.defaultLocale,
      storeId: this.store.id,
    };
  }

  async getSession(request: Request): Promise<Session> {
    return this.sessionHandler
      .getSession(request)
      .then((innerSession: InnerSession) => {
        try {
          const innerSessionValues: Map<string, string | undefined> = new Map<
            string,
            string | undefined
          >();
          Object.values(SessionKeys).forEach((value: string) => {
            innerSessionValues.set(value, innerSession.get(value));
          });
          return this.storeScopedSessionMapper.normalize(innerSessionValues);
        } catch (e: unknown) {
          if (e instanceof ValidationError) {
            this.logger.debug(
              `Session Inconsistency... Creating New Session`,
              e,
            );
          } else {
            this.logger.error(
              'Corrupt InnerSession... Creating New Session',
              e,
            );
          }
          return this.createSession();
        }
      });
  }

  async saveSession(session: Session, request: Request): Promise<string> {
    const innerSessionValues: Map<string, string | undefined> =
      this.storeScopedSessionMapper.serialize(session);
    const innerSession: InnerSession =
      await this.sessionHandler.getSession(request);

    innerSessionValues.forEach((value: string | undefined, key: string) => {
      innerSession.set(key, value);
    });

    return this.sessionHandler.commitSession(innerSession);
  }

  async destroySession(request: Request): Promise<string> {
    const innerSession: InnerSession =
      await this.sessionHandler.getSession(request);
    return this.sessionHandler.destroySession(innerSession);
  }
}
