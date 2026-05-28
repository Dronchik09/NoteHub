import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';
import { parse } from 'cookie';

const privateRoutes = ['/profile', '/notes', '/notes/filter'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        const responce = await checkServerSession();
        const setCookie = responce.headers['set-cookie'];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires
                ? new Date(parsed.Expires).getDate()
                : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken) {
              cookieStore.set({
                name: 'accessToken',
                value: parsed.accessToken,
                ...options,
              });
            }

            if (parsed.refreshToken) {
              cookieStore.set({
                name: 'refreshToken',
                value: parsed.refreshToken,
                ...options,
              });
            }
          }
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
  }
  if (isAuthRoute) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (refreshToken) {
      const responce = await checkServerSession();
      const setCookie = responce.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires
              ? new Date(parsed.Expires).getDate()
              : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) {
            cookieStore.set({
              name: 'accessToken',
              value: parsed.accessToken,
              ...options,
            });
          }

          if (parsed.refreshToken) {
            cookieStore.set({
              name: 'refreshToken',
              value: parsed.refreshToken,
              ...options,
            });
          }
        }
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
    '/notes/filter/:path*',
  ],
};
