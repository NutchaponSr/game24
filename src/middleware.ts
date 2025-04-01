import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  const publicPaths = ["/"];
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/overviews", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/overviews/:path*",
    "/history/:path*"
  ]
}