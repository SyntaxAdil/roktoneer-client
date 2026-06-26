"use client";

import React from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function AnalyticsChart({
  stats,
}) {
  const data = [
    {
      name: "Pending",
      value: stats?.pending || 0,
      color: "#f59e0b",
    },
    {
      name: "In Progress",
      value:
        stats?.inprogress || 0,
      color: "#3b82f6",
    },
    {
      name: "Completed",
      value: stats?.done || 0,
      color: "#10b981",
    },
    {
      name: "Canceled",
      value:
        stats?.canceled || 0,
      color: "#ef4444",
    },
  ].filter(
    (item) => item.value > 0,
  );

  return (
    <div className="p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 shadow-sm flex flex-col h-full min-h-[350px]">
      <div className="mb-2">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Request Analytics
        </h3>

        <p className="text-[11px] text-muted-foreground">
          Visual distribution of donation requests.
        </p>
      </div>

      <div className="flex-1 w-full min-h-[240px] flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.color
                      }
                    />
                  ),
                )}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "var(--popover)",
                  borderColor:
                    "var(--border)",
                  borderRadius:
                    "8px",
                  fontSize: "12px",
                }}
              />

              <Legend
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "11px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-xs text-muted-foreground text-center">
            No data available
          </p>
        )}
      </div>
    </div>
  );
}