export interface Cookie {
  name?: string;
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: true | false | 'lax' | 'strict' | 'none';
  secure?: boolean;
  secrets?: string[];
}
