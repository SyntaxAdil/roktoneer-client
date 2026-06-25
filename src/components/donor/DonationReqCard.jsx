"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight, Activity } from "lucide-react";

export default function DonationReqCard({ req }) {
  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-all w-full select-none h-full group">
      <div>
        {/* Header Node */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="p-2.5 bg-red-50 dark:bg-red-950/30 rounded-xl text-red-500 border border-red-500/10">
            <Activity className="size-5 animate-pulse" />
          </div>
          <div className="h-9 w-9 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-black text-xs flex items-center justify-center border border-red-500/20 shadow-sm shrink-0">
            {req.bloodGroup}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1">
            {req.recipientName}
          </h4>
          
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
            <span className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
              <MapPin className="size-3.5 text-red-500 shrink-0" />
              <span className="truncate">{req.location}</span>
            </span>
            <span className="flex items-center gap-2 text-xs text-zinc-400">
              <Calendar className="size-3.5 shrink-0" />
              <span className="truncate">{req.date}</span>
            </span>
            <span className="flex items-center gap-2 text-xs text-zinc-400">
              <Clock className="size-3.5 shrink-0" />
              <span className="truncate">{req.time}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-end">
        <Link
          href={`/donation-requests/${req.id}`}
          className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          View Details 
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}