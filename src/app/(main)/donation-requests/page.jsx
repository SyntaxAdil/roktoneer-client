import DonationRequestPage from "./DonationRequestPage";

async function getPendingRequests({
  page = 1,
  bloodGroup = "",
  district = "",
  upazila = "",
}) {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit: 8,
      ...(bloodGroup && { bloodGroup }),
      ...(district && { district }),
      ...(upazila && { upazila }),
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/public-pending?${queryParams.toString()}`,
      { cache: "no-store" }
    );

    const result = await res.json();

    return result.success
      ? {
          data: result.data,
          totalPages: result.totalPages || 1,
          totalItems: result.totalItems || 0,
        }
      : {
          data: [],
          totalPages: 1,
          totalItems: 0,
        };
  } catch (error) {
    console.error(error);

    return {
      data: [],
      totalPages: 1,
      totalItems: 0,
    };
  }
}

export default async function DonationReqPage({
  searchParams,
}) {
  const page = Number(searchParams?.page || 1);

  const bloodGroup = searchParams?.bloodGroup || "";
  const district = searchParams?.district || "";
  const upazila = searchParams?.upazila || "";

  const { data, totalPages, totalItems } =
    await getPendingRequests({
      page,
      bloodGroup,
      district,
      upazila,
    });

  return (
    <DonationRequestPage
      initialRequests={data}
      initialTotalPages={totalPages}
      initialTotalItems={totalItems}
      initialPage={page}
      initialFilters={{
        bloodGroup,
        district,
        upazila,
      }}
    />
  );
}