import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Allow auth and public routes
  if (pathname.startsWith('/auth') || pathname.startsWith('/_next') || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token && (pathname.startsWith('/account') || pathname.startsWith('/checkout') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Redirect to home if authenticated and trying to access login/register
  if (token && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Admin routes protection
  if (pathname.startsWith('/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};