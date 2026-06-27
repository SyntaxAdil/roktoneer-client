"use client";

import React from "react";

import StatsCards from "./StatsCards";
import RecentRequestsTable from "./RecentRequestsTable";
import AnalyticsChart from "./AnalyticsChart";

export default function DonorDashboard({ requests, stats }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Donor Dashboard</h1>

        <p className="text-sm text-muted-foreground mt-1">
          Overview of your donation requests and activities.
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentRequestsTable
            requests={requests}
            role="donor"
            title="My Recent Requests"
            description="Your latest 6 blood requests."
          />
        </div>

        <AnalyticsChart stats={stats} />
      </div>
    </div>
  );
}
