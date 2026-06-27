import { NextResponse } from "next/server";

import { headers } from "next/headers";
import { auth } from "../lib/auth/auth";

export default async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const role = user?.role; 

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (user && isAuthPage) {
    if (role === "admin" || role === "volunteer") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isDashboardRoute) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/dashboard/all-users")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    else if (pathname.startsWith("/dashboard/public-requests")) {
      if (role !== "admin" && role !== "volunteer") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    else {
      if (role !== "admin" && role !== "volunteer" && role !== "donor") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
};