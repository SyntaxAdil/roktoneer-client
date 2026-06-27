"use client";

import React from "react";
import { Users, HeartHandshake, Droplets, HandCoins } from "lucide-react";

import RecentRequestsTable from "./RecentRequestsTable";
import AnalyticsChart from "./AnalyticsChart";

export default function VolunteerDashboard({ requests, stats }) {
  const cards = [
    {
      title: "Active Donors",
      value: stats?.totalDonors ?? 0,
      icon: Users,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    },

    {
      title: "Blood Requests",
      value: stats?.totalRequests ?? 0,
      icon: Droplets,
      color: "text-red-500 bg-red-500/10 border-red-500/20",
    },

    {
      title: "Total Funding",
      value: `$${stats?.totalFunding ?? 0}`,
      icon: HandCoins,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },

    {
      title: "Volunteers",
      value: stats?.totalVolunteers ?? 0,
      icon: HeartHandshake,
      color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Volunteer Dashboard
        </h1>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Platform overview and donation activity analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                  {item.title}
                </p>

                <h2 className="text-3xl font-black mt-2 text-zinc-900 dark:text-zinc-50">
                  {item.value}
                </h2>
              </div>

              <div className={`p-3 rounded-xl border ${item.color}`}>
                <Icon className="size-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="xl:col-span-2">
        <RecentRequestsTable
          requests={requests || []}
          title="Latest Blood Requests"
          description="Latest 6 blood donation requests from all donors."
        />
      </div>
    </div>
  );
}
