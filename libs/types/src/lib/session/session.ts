import type { Country, CurrencyData, Locale } from '../localization';

export interface InnerSession {
  get<T>(name: string): T | undefined;

  set(name: string, value: any): void;

  remove(name: string): void;

  flash(name: string, value: any): void;

  dangerousInner(): any;
  
}

export interface Session {
  user: UserSession;
  cart?: CartSession;
  currency: CurrencyData;
}

export interface UserSession {
  guid: string;
  id: string;
  anonymous: boolean;
  firstName?: string;
  lastName?: string;
}

export interface CartSession {
  id: string;
  email?: string;
  totalItems?: number;
}
