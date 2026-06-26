import React from "react";
import { cookies, headers } from "next/headers";
import EditDonationRequestClient from "./EditDonationRequestClient";
import { auth } from "../../../../../../lib/auth/auth";
import DashboardHeader from "../../../../../../components/dashboard/DashboardHeader";

async function getRequestDetails(id) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/${id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) return null;
  const result = await res.json();
  return result.success ? result.data : null;
}

export default async function EditRequestPage({ params }) {
  const { id } = await params;
  const requestData = await getRequestDetails(id);

  if (!requestData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm font-medium text-zinc-500">
          Request details not found or unauthorized.
        </p>
      </div>
    );
  }

  return <>
  <DashboardHeader title="Edit Request" ></DashboardHeader>
  <EditDonationRequestClient initialData={requestData} id={id} /></>;
}
