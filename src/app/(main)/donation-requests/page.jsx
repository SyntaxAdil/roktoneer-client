import DonationRequestPage from "./DonationRequestPage";

async function getPendingRequests(page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/public-pending?page=${page}&limit=8`,
      { cache: "no-store" }
    );
    const result = await res.json();
    return result.success 
      ? { data: result.data, totalPages: result.totalPages || 1, totalItems: result.totalItems || 0 } 
      : { data: [], totalPages: 1, totalItems: 0 };
  } catch (error) {
    console.error(error);
    return { data: [], totalPages: 1, totalItems: 0 };
  }
}

export default async function DonationReqPage() {
  const { data, totalPages, totalItems } = await getPendingRequests(1);

  return (
    <div>
      <DonationRequestPage 
        initialRequests={data} 
        initialTotalPages={totalPages}
        initialTotalItems={totalItems}
      />
    </div>
  );
}