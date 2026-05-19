import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log('[proxy] path=', pathname);
  // Allow auth routes, static files, and Next internals
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/login') ||
    pathname.includes('.')
  ) {
    console.log('[proxy] allow path=', pathname);
    return NextResponse.next();
  }

  const token = req.cookies.get('token');
  const tokenValue = typeof token === 'string' ? token : token?.value;
  if (!tokenValue) {
    console.log("No se encontró token, redirigiendo a login")
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  try {
    await verifyToken(tokenValue);
    console.log("Token verificado correctamente")
    return NextResponse.next();
  } catch (error) {
    console.log("Está saliendo por el catch")
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/:path*'],
};
