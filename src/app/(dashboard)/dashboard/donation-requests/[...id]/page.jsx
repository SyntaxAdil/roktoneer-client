import React, { Suspense } from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import DonationRequestClient from "../../my-requests/[id]/DonationRequestClient";


export default async function DonationRequestDetails({ params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/${id}`;

  let requestData = null;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      requestData = result.data;
    }
  } catch (error) {
    console.error("Failed to fetch donation request details on server", error);
  }

  if (!requestData) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-lg font-black text-red-500">Request Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1">
          The requested blood donation pipeline does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-red-500" />
        </div>
      }
    >
      <DonationRequestClient request={requestData} />
    </Suspense>
  );
}