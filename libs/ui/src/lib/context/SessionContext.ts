import type {
  Country,
  Currency,
  Locale,
  Session,
  UserSession,
} from '@ducati/types';
import type { Context, Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export const initialSession: Session = {
  country: {} as Country,
  currency: {} as Currency,
  user: {} as UserSession,
  locale: {} as Locale,
  storeId: '',
};

export const initialSessionContext: SessionContextProps = {
  session: initialSession,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSession: () => {},
};

export interface SessionContextProps {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
}

export const SessionContext: Context<SessionContextProps> =
  createContext<SessionContextProps>(initialSessionContext);
