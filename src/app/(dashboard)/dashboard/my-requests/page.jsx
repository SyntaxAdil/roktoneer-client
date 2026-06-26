import React, { Suspense } from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

import { Loader2 } from "lucide-react";

import DonationRequestsClient from "./DonationRequestsClient";

import DashboardHeader from "../../../../components/dashboard/DashboardHeader";

export default async function MyRequestsPage({
  searchParams,
}) {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user?.email)
    return null;

  const { token } =
    await auth.api.getToken({
      headers: await headers(),
    });

  const resolvedParams =
    await searchParams;

  const page =
    resolvedParams.page || "1";

  const status =
    resolvedParams.status || "";

  const limit = 4;

  const url =
    `${process.env.NEXT_PUBLIC_API_URL}/api/donation-request/${session.user.email}?page=${page}&limit=${limit}${
      status
        ? `&status=${status}`
        : ""
    }`;

  let data = [];

  let total = 0;

  try {
    const res = await fetch(url, {
      cache: "no-store",

      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      data = result.data;

      total = result.total;
    }
  } catch (error) {
    console.error(
      "Failed to fetch data on server",
      error,
    );
  }

  return (
    <>
      <DashboardHeader title="My Requests" />

      <Suspense
        fallback={
          <div className="w-full min-h-[400px] flex items-center justify-center">
            <Loader2 className="size-6 animate-spin text-red-500" />
          </div>
        }
      >
        <DonationRequestsClient
          initialRequests={data}
          total={total}
          currentPage={Number(page)}
          currentStatus={status}
        />
      </Suspense>
    </>
  );
}