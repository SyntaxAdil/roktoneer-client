"use client";

import React from "react";

import StatsCards from "./StatsCards";
import AnalyticsChart from "./AnalyticsChart";
import RecentRequestsTable from "./RecentRequestsTable";

export default function DashboardClient({
  initialRequests,
  stats,
  role,
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 select-none">
      <div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Welcome to Dashboard
        </h1>

        <p className="text-xs text-muted-foreground mt-1">
          Quick overview of blood donation activities and request pipeline.
        </p>
      </div>

      <StatsCards
        stats={stats}
        role={role}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className={
            role === "donor"
              ? "lg:col-span-2"
              : "lg:col-span-3"
          }
        >
          <RecentRequestsTable
            requests={initialRequests}
            role={role}
          />
        </div>

        {role === "donor" && (
          <div className="lg:col-span-1">
            <AnalyticsChart
              stats={stats}
            />
          </div>
        )}
      </div>
    </div>
  );
}