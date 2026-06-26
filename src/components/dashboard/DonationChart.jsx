"use client";

import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { authClient } from "@/lib/auth/auth-client";
import { BarChart3, Loader2, AlertCircle } from "lucide-react";

export default function DonationChart() {
  const [view, setView] = useState("daily");
  const [data, setData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/donation-analytics`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
          }
        );

        const result = await res.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to load analytics");
        }

        setData({
          daily: result.data?.daily || [],
          weekly: result.data?.weekly || [],
          monthly: result.data?.monthly || [],
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const currentData = data?.[view] || [];

  return (
    <div className="w-full rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-red-500" />

            <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Donation Analytics
            </h2>
          </div>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Track total requests and completed donations.
          </p>
        </div>

        <div className="flex items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1">
          {["daily", "weekly", "monthly"].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${
                view === item
                  ? "bg-white dark:bg-zinc-950 text-red-600 dark:text-red-400 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[350px] w-full pt-6">
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <Loader2 className="size-7 animate-spin text-red-500" />

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Loading analytics...
            </p>
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <AlertCircle className="size-7 text-red-500" />

            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              {error}
            </p>
          </div>
        ) : currentData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No analytics data found
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-zinc-100 dark:stroke-zinc-800/60"
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                className="text-[11px] text-zinc-400"
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-[11px] text-zinc-400"
              />

              <Tooltip
                cursor={{ fill: "rgba(239,68,68,0.05)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="space-y-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xl">
                        <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                          {payload[0]?.payload?.name}
                        </p>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-8 text-xs">
                            <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                              <span className="size-2 rounded-full bg-red-500" />
                              Requests
                            </span>

                            <span className="font-black text-zinc-900 dark:text-zinc-50">
                              {payload[0]?.value}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-8 text-xs">
                            <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                              <span className="size-2 rounded-full bg-emerald-500" />
                              Completed
                            </span>

                            <span className="font-black text-zinc-900 dark:text-zinc-50">
                              {payload[1]?.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Bar
                dataKey="requests"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />

              <Bar
                dataKey="completed"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}