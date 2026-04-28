import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isProtectedRoute } from "./config/isProtectedRoute";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname.startsWith("/login");

  const protectedRoute = isProtectedRoute(pathname);

  if (!token && protectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
