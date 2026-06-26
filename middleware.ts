import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTE_PREFIXES = [
  "/admin",
  "/intern",
  "/hr",
  "/teamlead",
  "/login",
];

function isPrivateRoute(pathname: string) {
  return PRIVATE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function middleware(request: NextRequest) {
  if (!isPrivateRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/intern/:path*",
    "/hr/:path*",
    "/teamlead/:path*",
    "/login",
    "/login/:path*",
  ],
};
