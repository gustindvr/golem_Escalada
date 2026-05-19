import { NextResponse } from 'next/server';
import { TOKEN_NAME } from '../../../../lib/auth';

export async function POST() {
  const cookie = `${TOKEN_NAME}=deleted; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;`;
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', cookie);
  return res;
}
