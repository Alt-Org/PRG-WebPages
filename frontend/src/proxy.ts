import acceptLanguage from 'accept-language';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fallbackLng, languages, cookieName } from './shared/i18n/settings/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|images|icons|documents|robots).*)',
  ],
};

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1)
    return NextResponse.next();

  const cookieLng = req.cookies.has(cookieName)
    ? acceptLanguage.get(req.cookies.get(cookieName)?.value)
    : null;

  const lng = cookieLng ?? acceptLanguage.get(req.headers.get('Accept-Language')) ?? fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer')!);
    const lngInReferer = languages.find((language) =>
      refererUrl.pathname.startsWith(`/${language}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
