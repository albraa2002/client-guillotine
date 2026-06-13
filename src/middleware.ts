import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Allow auth pages and landing
    if (
      pathname.startsWith("/auth") ||
      pathname.startsWith("/landing") ||
      pathname.startsWith("/api/auth") ||
      pathname === "/"
    ) {
      return NextResponse.next();
    }

    // Protect dashboard routes
    if (pathname.startsWith("/dashboard") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Protect API routes (except auth)
    if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth") && !req.nextauth.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
