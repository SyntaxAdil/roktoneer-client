import { NextResponse } from "next/server";
import { auth } from "./lib/auth/auth";
import { headers } from "next/headers";

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

  const isDashboardRoute =
    pathname.startsWith("/dashboard");

  if (user && isAuthPage) {
    if (role === "admin" || role === "volunteer") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  const protectedRoutes = [
    "/donors",
    "/fundings",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set(
        "message",
        "Please login first"
      );

      return NextResponse.redirect(loginUrl);
    }

    if (
  !["admin", "volunteer", "donor"].includes(role)
) {
  return NextResponse.redirect(
    new URL("/", request.url)
  );
}
  }

  if (isDashboardRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set(
        "message",
        "Please login first"
      );

      return NextResponse.redirect(loginUrl);
    }

    const adminOnlyRoutes = [
      "/dashboard/all-users",
    ];

    const adminVolunteerRoutes = [
      "/dashboard/public-requests",
    ];

    const isAdminOnly = adminOnlyRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const isAdminVolunteer = adminVolunteerRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAdminOnly && role !== "admin") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    if (
      isAdminVolunteer &&
      role !== "admin" &&
      role !== "volunteer"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    if (
      !["admin", "volunteer", "donor"].includes(role)
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/donors/:path*",
    "/fundings/:path*",
  ],
};