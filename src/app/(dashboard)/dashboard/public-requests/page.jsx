import React, { Suspense } from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Loader2 } from "lucide-react";
import PublicRequestsClient from "./PublicRequestsClient";
import DashboardHeader from "../../../../components/dashboard/DashboardHeader";
export const metadata = {
  title: "Public Requests | Roktoneer",
};
export default async function PublicRequestsPage({
  searchParams,
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role;
  const status = session.user.status;

  if (
    role === "donor" ||
    status !== "active"
  ) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-lg font-black text-red-500">
          Access Denied
        </h2>

        <p className="text-xs text-muted-foreground mt-1">
          This panel is restricted.
        </p>
      </div>
    );
  }

  const resolvedParams = await searchParams;

  const page =
    Number(resolvedParams.page) || 1;

  const filterStatus =
    resolvedParams.status || "";

  const limit = 5;

  const { token } =
    await auth.api.getToken({
      headers: await headers(),
    });

  const url =
    `${process.env.NEXT_PUBLIC_API_URL}` +
    `/api/donation-requests/all?page=${page}&limit=${limit}&status=${filterStatus}`;

  let fetchedData = [];
  let totalRequests = 0;

  try {
    const res = await fetch(url, {
      cache: "no-store",

      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      fetchedData = result.data || [];
      totalRequests = result.total || 0;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
    <DashboardHeader title="All Donation Requests" ></DashboardHeader>
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-red-500" />
        </div>
      }
    >
      <PublicRequestsClient
        requests={fetchedData}
        total={totalRequests}
        currentPage={page}
        limit={limit}
        userRole={role}
        currentStatus={filterStatus}
      />
    </Suspense></>
  );
}