import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import VolunteerDashboard from "@/components/dashboard/VolunteerDashboard";
import DonorDashboard from "@/components/dashboard/DonorDashboard";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  let requests = [];

  let stats = {};

  try {
    if (user?.role === "admin") {
      const [usersRes, requestsRes] = await Promise.all([
        fetch(`${baseUrl}/api/users?limit=9999`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }),

        fetch(`${baseUrl}/api/donation-requests/all?limit=6`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }),
      ]);

      const usersData = await usersRes.json();

      const requestsData = await requestsRes.json();

      requests = requestsData?.data || [];

      const allUsers = usersData?.data || [];

      stats = {
        totalDonors: allUsers.filter((u) => u.role === "donor").length,

        totalVolunteers: allUsers.filter((u) => u.role === "volunteer").length,

        totalRequests: requestsData?.total || 0,

        totalFunding: 0,

        pending: requests.filter((r) => r.donationStatus === "pending").length,

        inprogress: requests.filter((r) => r.donationStatus === "inprogress")
          .length,

        done: requests.filter((r) => r.donationStatus === "done").length,

        canceled: requests.filter((r) => r.donationStatus === "canceled")
          .length,
      };
    } else if (user?.role === "volunteer") {
      const [usersRes, requestsRes] = await Promise.all([
        fetch(`${baseUrl}/api/users?limit=9999`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }),

        fetch(`${baseUrl}/api/donation-requests/all?limit=6`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }),
      ]);

      const usersData = await usersRes.json();

      const requestsData = await requestsRes.json();

      requests = requestsData?.data || [];

      const allUsers = usersData?.data || [];

      stats = {
        totalDonors: allUsers.filter((u) => u.role === "donor").length,

        totalRequests: requestsData?.total || 0,

        activeRequests: requests.filter(
          (r) =>
            r.donationStatus === "pending" || r.donationStatus === "inprogress",
        ).length,
      };
    } else {
      const res = await fetch(
        `${baseUrl}/api/donation-request/${user?.email}?limit=6`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );

      const result = await res.json();

      requests = result?.data || [];

      stats = {
        total: result?.total || 0,

        pending: requests.filter((r) => r.donationStatus === "pending").length,

        inprogress: requests.filter((r) => r.donationStatus === "inprogress")
          .length,

        done: requests.filter((r) => r.donationStatus === "done").length,

        canceled: requests.filter((r) => r.donationStatus === "canceled")
          .length,
      };
    }
  } catch (error) {
    console.log(error);
  }

  switch (user?.role) {
    case "admin":
      return (
        <>
          <DashboardHeader></DashboardHeader>
          <AdminDashboard requests={requests} stats={stats} />
        </>
      );

    case "volunteer":
      return (
        <>
          <DashboardHeader></DashboardHeader>{" "}
          <VolunteerDashboard requests={requests} stats={stats} />
        </>
      );

    default:
      return (
        <>
          <DashboardHeader></DashboardHeader>
          <DonorDashboard requests={requests} stats={stats} />
        </>
      );
  }
}
