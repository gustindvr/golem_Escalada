import jwt from 'jsonwebtoken';

const TOKEN_EXPIRES_IN = '30d';
const TOKEN_NAME = 'token';

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET is not set. Set process.env.JWT_SECRET to enable token signing.');
}

export type User = {
  id: string | number;
  username: string;
};

export function signToken(payload: object) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRES_IN });
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.verify(token, secret) as any;
}

export async function validateCredentials(username: string, password: string): Promise<User | null> {
  const env = process.env.AUTH_USERS || '';
  if (!env) return null;

  const pairs = env.split(',').map(p => p.trim()).filter(Boolean);
  for (const pair of pairs) {
    const [u, p] = pair.split(':');
    if (!u) continue;
    const stored = p ?? '';

    if (u === username && password === stored) return { id: `env-${u}`, username: u };
  }

  return null;
}

export { TOKEN_EXPIRES_IN, TOKEN_NAME };
