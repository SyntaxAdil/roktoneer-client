"use client";

import React from "react";
import { SearchX, HeartPulse } from "lucide-react";

export default function NoDonor({ isInitial = false }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center p-10 sm:p-14 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="relative mb-5">
        <div className="size-20 rounded-3xl bg-red-500/10 flex items-center justify-center border border-red-500/10">
          {isInitial ? (
            <HeartPulse className="size-10 text-red-500" />
          ) : (
            <SearchX className="size-10 text-zinc-400" />
          )}
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50">
          {isInitial
            ? "Search Blood Donors"
            : "No Donors Found"}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {isInitial
            ? "Select blood group and location filters to find available blood donors near your area."
            : "We could not find any matching donors based on your current search filters."}
        </p>
      </div>
    </div>
  );
}