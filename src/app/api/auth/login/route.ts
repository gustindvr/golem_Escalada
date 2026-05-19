import { NextResponse } from 'next/server';
import { validateCredentials, signToken, TOKEN_NAME } from '../../../../lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body || {};
    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const user = await validateCredentials(username, password);
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = signToken({ sub: user.id, username: user.username });
    const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
    const secure = process.env.NODE_ENV === 'production';

    const res = NextResponse.json({ ok: true, user: { id: user.id, username: user.username } });
    res.cookies.set({
      name: TOKEN_NAME,
      value: token,
      httpOnly: true,
      maxAge,
      path: '/',
      sameSite: 'lax',
      secure,
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
