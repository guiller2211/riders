import { createHash } from 'crypto';
import { getSession, commitSession } from './fb.sessions.server';

export const generateCsrfToken = async (session: any) => {
  const csrfToken = createHash('sha256').update(session.id + process.env.CSRF_SECRET).digest('hex');
  session.set('csrfToken', csrfToken);
  return csrfToken;
};

export const verifyCsrfToken = async (session: any, token: string) => {
  const expectedToken = session.get('csrfToken');
  return expectedToken === token;
};
