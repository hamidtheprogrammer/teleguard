import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthPage = path === "/auth"; // Define public/auth page

  const token = request.cookies.get("jwt");

  // If a token exists, verify it
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (!token && !isAuthPage)
    return NextResponse.redirect(new URL("/auth", request.url));
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: [],
};
