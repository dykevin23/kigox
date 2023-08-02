import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });
  if (token) {
    if (req.nextUrl.pathname.includes("/auth/login")) {
      req.nextUrl.pathname = "/";
      return NextResponse.redirect(req.nextUrl);
    }
  } else {
    if (!req.nextUrl.pathname.includes("/auth/join")) {
      if (!req.nextUrl.pathname.includes("/auth/login")) {
        req.nextUrl.pathname = "/auth/login";
        return NextResponse.redirect(req.nextUrl);
      }
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
