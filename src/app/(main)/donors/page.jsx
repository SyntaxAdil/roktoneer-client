import FindDonorPage from "./FindDonarPage";

async function getInitialDonors() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/donors?page=1&limit=6`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result.success
      ? result
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

export default async function FindDonarsPage() {
  const initialData = await getInitialDonors();

  return (
    <section>
      <FindDonorPage
        initialRequests={initialData.data}
        initialTotalPages={initialData.totalPages}
        initialTotalItems={initialData.totalItems}
      />
    </section>
  );
}