"use client";

import React from "react";
import {
  Activity,
  Clock,
  CheckCircle2,
  Users,
  HandHeart,
  HeartPulse,
} from "lucide-react";

export default function StatsCards({
  stats,
  role,
}) {
  const adminCards = [
    {
      title: "Total Donors",
      value: stats?.totalDonors || 0,
      icon: Users,
      color:
        "text-violet-500 bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "Blood Requests",
      value:
        stats?.totalRequests || 0,
      icon: HeartPulse,
      color:
        "text-red-500 bg-red-500/10 border-red-500/20",
    },
    {
      title: "Total Fundings",
      value:
        stats?.totalFundings || 0,
      icon: HandHeart,
      color:
        "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Pending Requests",
      value: stats?.pending || 0,
      icon: Clock,
      color:
        "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
  ];

  const donorCards = [
    {
      title: "Total Requests",
      value: stats?.total || 0,
      icon: HeartPulse,
      color:
        "text-red-500 bg-red-500/10 border-red-500/20",
    },
    {
      title: "Pending",
      value: stats?.pending || 0,
      icon: Clock,
      color:
        "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "In Progress",
      value:
        stats?.inprogress || 0,
      icon: Activity,
      color:
        "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Completed",
      value: stats?.done || 0,
      icon: CheckCircle2,
      color:
        "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  const cardItems =
    role === "admin" ||
    role === "volunteer"
      ? adminCards
      : donorCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardItems.map((item, idx) => {
        const Icon = item.icon;

        return (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {item.title}
              </p>

              <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50">
                {item.value}
              </h3>
            </div>

            <div
              className={`p-3 rounded-xl border ${item.color}`}
            >
              <Icon className="size-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}