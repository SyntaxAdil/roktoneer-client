"use client";

import React from "react";
import { SearchX, Sparkles } from "lucide-react";

export default function NoDonor({ targetedGroup, onExpand }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10">
      {/* Icon */}
      <div className="relative mb-4">
        <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-400 dark:text-zinc-500 border border-zinc-200/40 dark:border-zinc-800">
          <SearchX className="size-8 stroke-[1.5]" />
        </div>
        <Sparkles className="size-4 text-red-500 absolute -top-1 -right-1 animate-pulse" />
      </div>
      
      {/* Text */}
      <div className="flex flex-col gap-1 max-w-sm">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          No Results Found for {targetedGroup || "Selected Group"}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          We couldn&apos;t find any active donors matching this criteria in your current area range. Try expanding your parameters.
        </p>
      </div>

      {/* Button */}
      {onExpand && (
        <button
          onClick={onExpand}
          type="button"
          className="mt-5 inline-flex items-center justify-center text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 underline underline-offset-4 active:scale-98 transition-transform"
        >
          Expand Search Area
        </button>
      )}
    </div>
  );
}