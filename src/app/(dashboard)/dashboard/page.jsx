import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import VolunteerDashboard from "@/components/dashboard/VolunteerDashboard";
import DonorDashboard from "@/components/dashboard/DonorDashboard";

import DashboardHeader from "../../../components/dashboard/DashboardHeader";

export const metadata = {
  title: "Dashboard | Roktoneer",
};
async function getFundCount() {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/funds/total-funds`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result.success ? result.totalFunds : 0;

  } catch (error) {

    console.error(error);

    return 0;

  }

}

export default async function DashboardPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL;

  let requests = [];

  let stats = {};

  try {

    if (
      user?.role === "admin" ||
      user?.role === "volunteer"
    ) {

      const [
        donorsRes,
        requestsRes,
        usersRes,
        totalFunding
      ] = await Promise.all([

        fetch(
          `${baseUrl}/api/active-donors-count`,
          {
            cache: "no-store",
          }
        ),

        fetch(
          `${baseUrl}/api/donation-requests/all?limit=9999`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        ),

        fetch(
          `${baseUrl}/api/users?limit=9999`,
          {
            cache: "no-store",
          }
        ),

        getFundCount()

      ]);

      const donorsData =
        await donorsRes.json();

      const requestsData =
        await requestsRes.json();

      const usersData =
        await usersRes.json();

      const allUsers =
        usersData?.data || [];

      const allRequests =
        requestsData?.data || [];

      requests = allRequests
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, 6);

      stats = {

        totalDonors:
          donorsData?.data || 0,

        totalVolunteers:
          allUsers.filter(
            (u) =>
              u.role ===
              "volunteer"
          ).length,

        totalRequests:
          allRequests.length,

        totalFunding,

        activeRequests:
          allRequests.filter(
            (r) =>
              r.donationStatus ===
                "pending" ||
              r.donationStatus ===
                "inprogress"
          ).length,

        pending:
          allRequests.filter(
            (r) =>
              r.donationStatus ===
              "pending"
          ).length,

        inprogress:
          allRequests.filter(
            (r) =>
              r.donationStatus ===
              "inprogress"
          ).length,

        done:
          allRequests.filter(
            (r) =>
              r.donationStatus ===
              "done"
          ).length,

        canceled:
          allRequests.filter(
            (r) =>
              r.donationStatus ===
              "canceled"
          ).length,

      };

    } else {

      const res = await fetch(
        `${baseUrl}/api/donation-request/${user?.email}?limit=9999`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const result = await res.json();

      const myRequests =
        result?.data || [];

      requests = myRequests
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, 6);

      stats = {

        total:
          myRequests.length,

        pending:
          myRequests.filter(
            (r) =>
              r.donationStatus ===
              "pending"
          ).length,

        inprogress:
          myRequests.filter(
            (r) =>
              r.donationStatus ===
              "inprogress"
          ).length,

        done:
          myRequests.filter(
            (r) =>
              r.donationStatus ===
              "done"
          ).length,

        canceled:
          myRequests.filter(
            (r) =>
              r.donationStatus ===
              "canceled"
          ).length,

      };

    }

  } catch (error) {

    console.log(error);

  }

  switch (user?.role) {

    case "admin":
      return (
        <>
          <DashboardHeader />

          <AdminDashboard
            requests={requests}
            stats={stats}
          />
        </>
      );

    case "volunteer":
      return (
        <>
          <DashboardHeader />

          <VolunteerDashboard
            requests={requests}
            stats={stats}
          />
        </>
      );

    default:
      return (
        <>
          <DashboardHeader />

          <DonorDashboard
            requests={requests}
            stats={stats}
          />
        </>
      );

  }

}