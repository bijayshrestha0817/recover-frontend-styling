import { protectedRoutes } from "./routes";

export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(route + "/")
  );
}
