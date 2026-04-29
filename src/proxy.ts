import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isProtectedRoute } from "./config/isProtectedRoute";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;

  const isProtected = isProtectedRoute(pathname);
  const isLoginPage = pathname === "/login";

  // 1. Block unauthenticated users from protected routes
if (!token && isProtected && !isLoginPage) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

  // 2. Prevent logged-in users from visiting login page
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};