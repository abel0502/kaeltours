import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isApiAdminRoute = req.nextUrl.pathname.startsWith('/api/admin');

  if ((isAdminRoute || isApiAdminRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/(admin|api/admin)/:path*'],
};
