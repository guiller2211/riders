import type {
  Session as RemixSession,
  SessionData as RemixSessionData,
} from '@remix-run/node';
import type { InnerSession } from '@ducati/types';
import { getSession } from '../app/server/fb.sessions.server';

export async function getSessionDucati(request: Request): Promise<InnerSession> {
  const session: RemixSession<RemixSessionData, RemixSessionData> =
    await getSession(request.headers.get('Cookie'));

  return {
    get<T>(name: string): T | undefined {
      const val = session.get(name);
      if (val) {
        if (typeof val === 'object') {
          return JSON.parse(val) as T;
        }
        return val as T;
      }
      return undefined;
    },

    set(name: string, value: any): void {
      if (name && value) {
        session.set(
          name,
          typeof value === 'object' ? JSON.stringify(value) : value,
        );
      }
    },

    remove(name: string): void {
      if (name) {
        session.unset(name);
      }
    },

    flash(name: string, value: any): void {
      if (name && value) {
        session.flash(
          name,
          typeof value === 'object' ? JSON.stringify(value) : value,
        );
      }
    },

    dangerousInner(): any {
      return session;
    },
  };
}