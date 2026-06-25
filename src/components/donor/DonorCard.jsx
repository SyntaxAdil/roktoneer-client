"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Calendar, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DonorCard({ donor }) {
  // Status check
  const isReady = donor.status === "pending";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-all w-full select-none">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Avatar */}
        <div className="relative shrink-0">
          <Image
            width={48}
            height={48}
            src={donor.img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"}
            alt={donor.name || "Donor"}
            className="h-12 w-12 rounded-full object-cover border border-zinc-100 dark:border-zinc-800"
          />
          <span className={cn(
            "absolute bottom-0 right-0 size-3 rounded-full border-2 border-white dark:border-zinc-900",
            isReady ? "bg-emerald-500" : "bg-zinc-400"
          )} />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50 truncate">
            {donor.name}
          </h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 min-w-0 truncate">
              <MapPin className="size-3.5 text-red-500 shrink-0" />
              <span className="truncate">{donor.location}</span>
            </span>
            <span className="flex items-center gap-1 shrink-0 text-zinc-400">
              <Calendar className="size-3.5 shrink-0" />
              <span>Last donated: {donor.lastDonated}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Group & Badge */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-2 border-t sm:border-0 pt-3 sm:pt-0 border-zinc-100 dark:border-zinc-800">
        <div className="h-10 w-10 rounded-xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-black text-sm flex items-center justify-center border border-red-500/20 shadow-sm">
          {donor.group}
        </div>
        
        {isReady ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/10">
            <CheckCircle className="size-3" /> Ready to Donate
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700">
            <Clock className="size-3" /> In Cooling Period
          </span>
        )}
      </div>
    </div>
  );
}