import React, { Suspense } from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AllUsersClient from "./AllUsersClient";
import { Loader2 } from "lucide-react";
import DashboardHeader from "../../../../components/dashboard/DashboardHeader";

export default async function AllUsersPage({
  searchParams,
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-lg font-black text-red-500">
          Access Denied
        </h2>

        <p className="text-xs text-muted-foreground mt-1">
          This panel is restricted to
          admins only.
        </p>
      </div>
    );
  }

  const { token } =
    await auth.api.getToken({
      headers: await headers(),
    });
console.log("token",token)
  const resolvedParams =
    await searchParams;

  const page =
    Number(
      resolvedParams?.page,
    ) || 1;

  const currentStatus =
    resolvedParams?.status ||
    "all";

  const limit = 5;

  const params =
    new URLSearchParams();

  params.set(
    "page",
    page.toString(),
  );

  params.set(
    "limit",
    limit.toString(),
  );

  if (
    currentStatus &&
    currentStatus !== "all"
  ) {
    params.set(
      "status",
      currentStatus,
    );
  }

  const url =
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?${params.toString()}`;

  let users = [];
  let total = 0;

  try {
    const res = await fetch(url, {
      cache: "no-store",

      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const result =
      await res.json();

    if (result.success) {
      users =
        result.data || [];

      total =
        result.total || 0;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <>
    <DashboardHeader title="All users"/>
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-red-500" />
        </div>
      }
    >
      <AllUsersClient
        users={users}
        total={total}
        currentPage={page}
        limit={limit}
        currentStatus={
          currentStatus
        }
      />
    </Suspense></>
  );
}