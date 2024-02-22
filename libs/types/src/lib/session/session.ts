import type { Country, Currency, Locale } from '../localization';

export interface InnerSession {
  get<T>(name: string): T | undefined;

  set(name: string, value: any): void;

  remove(name: string): void;

  flash(name: string, value: any): void;

  dangerousInner(): any;
}

export interface Session {
  /*   country: Country;
  user: UserSession;
  cart?: CartSession;
  currency: Currency;
  locale: Locale;
  storeId: string; */
  cart?: CartSession;
  provider_token?: string | null
  provider_refresh_token?: string | null
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: number
  token_type: string
  user: User
}
export interface UserIdentity {
  id: string
  user_id: string
  identity_data?: {
    [key: string]: any
  }
  identity_id: string
  provider: string
  created_at?: string
  last_sign_in_at?: string
  updated_at?: string
}
export interface Factor {
  id: string
  friendly_name?: string
  factor_type: 'totp' | string
  status: 'verified' | 'unverified'
  created_at: string
  updated_at: string
}
export interface User {
  id: string
  app_metadata: UserAppMetadata
  user_metadata: UserMetadata
  aud: string
  confirmation_sent_at?: string
  recovery_sent_at?: string
  email_change_sent_at?: string
  new_email?: string
  new_phone?: string
  invited_at?: string
  action_link?: string
  email?: string
  phone?: string
  created_at: string
  confirmed_at?: string
  email_confirmed_at?: string
  phone_confirmed_at?: string
  last_sign_in_at?: string
  role?: string
  updated_at?: string
  identities?: UserIdentity[]
  factors?: Factor[],
  //guid: string;
  //anonymous?: boolean;
}

export interface CartSession {
  id: string;
  email?: string;
  totalItems?: number;
}
export interface UserAppMetadata {
  provider?: string
  [key: string]: any
}

export interface UserMetadata {
  [key: string]: any
}

