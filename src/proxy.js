import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth/auth.js";



export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role;

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL(
        role === "admin" || role === "volunteer"
          ? "/dashboard"
          : "/",
        request.url
      )
    );
  }

  const protectedRoutes = [
    "/dashboard",
    "/donors",
    "/fundings",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    isProtected &&
    !["admin", "volunteer", "donor"].includes(role)
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  if (
    pathname.startsWith("/dashboard/all-users") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  if (
    pathname.startsWith("/dashboard/public-requests") &&
    role !== "admin" &&
    role !== "volunteer"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/donors",
    "/fundings",
  ],
};