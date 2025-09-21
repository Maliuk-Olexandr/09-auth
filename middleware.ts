import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Якщо немає accessToken
  if (!accessToken) {
    if (refreshToken) {
      // Пробуємо оновити сесію
      const data = await checkServerSession();

      if (!data || data.status !== 200) {
        // Якщо refreshToken недійсний → редірект на /sign-in
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL('/sign-in', request.url));
        }
        return NextResponse.next();
      }

      const setCookie = data.headers['set-cookie'];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        const response = NextResponse.next();

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          if (parsed.accessToken) {
            response.cookies.set('accessToken', parsed.accessToken, {
              path: parsed.Path ?? '/',
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
            });
          }
          if (parsed.refreshToken) {
            response.cookies.set('refreshToken', parsed.refreshToken, {
              path: parsed.Path ?? '/',
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
            });
          }
        }

        // Якщо користувач був на публічній сторінці, редіректимо на головну
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url));
        }

        return response;
      }
    }

    // Якщо refreshToken немає або не вдалося оновити
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
  }

  // Якщо accessToken існує:
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
