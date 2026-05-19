import { NextResponse } from 'next/server';
import { TOKEN_NAME } from '../../../../lib/auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: TOKEN_NAME,
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
  });
  return res;
}
