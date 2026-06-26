
import DonationRequestClient from "./DonationRequestClient";
import { notFound } from "next/navigation";
import { auth } from "../../../../../lib/auth/auth";
import { headers } from "next/headers";

export default async function DonationRequestPage({ params }) {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  let requestData = null;

  try {
    const res = await fetch(`${baseUrl}/api/donation-requests/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });
    
    const result = await res.json();
    if (result.success) {
      requestData = result.data;
    }
  } catch (error) {
    console.error("Failed to fetch donation request:", error);
  }

  if (!requestData) {
    notFound();
  }

  return <DonationRequestClient request={requestData} />;
}