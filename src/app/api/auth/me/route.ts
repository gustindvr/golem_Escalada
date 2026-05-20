import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken } from '../../../../lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token');
  const tokenValue = typeof token === 'string' ? token : token?.value;
  if (!tokenValue) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    await verifyToken(tokenValue);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
