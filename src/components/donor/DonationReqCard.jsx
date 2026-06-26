"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight, Activity } from "lucide-react";
import { HiHandRaised } from "react-icons/hi2";

export default function DonationReqCard({ req }) {
  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full select-none h-full group overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-red-500" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="p-2.5 bg-red-50 dark:bg-red-950/30 rounded-xl text-red-500 border border-red-500/10">
            <Activity className="size-5 animate-pulse" />
          </div>

          <div className="h-10 w-10 rounded-xl bg-red-500 text-white font-black text-xs flex items-center justify-center shadow-sm shrink-0">
            {req?.bloodGroup}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h4 className="text-base font-black text-zinc-900 dark:text-zinc-50 line-clamp-1 tracking-tight">
              {req?.recipientName}
            </h4>

            <p className="text-[11px] text-zinc-400 mt-2 uppercase tracking-wider font-semibold inline-flex items-center gap-1">
              <HiHandRaised className="text-sm text-red-400/80" />
              <span>Request by</span>
              <strong className="text-red-400/90 font-bold normal-case">
                {req?.requesterName}
              </strong>
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
            <span className="flex items-start gap-2 text-xs text-muted-foreground min-w-0">
              <MapPin className="size-3.5 text-red-500 shrink-0 mt-0.5" />

              <span className="line-clamp-2 leading-relaxed">
                {req?.recipientDistrict}, {req?.recipientUpazila}
              </span>
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 rounded-lg px-2.5 py-2 border border-zinc-100 dark:border-zinc-800/60">
                <Calendar className="size-3.5 shrink-0 text-red-500" />

                <span className="truncate">{req?.donationDate}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 rounded-lg px-2.5 py-2 border border-zinc-100 dark:border-zinc-800/60">
                <Clock className="size-3.5 shrink-0 text-red-500" />

                <span className="truncate">{req?.donationTime}</span>
              </div>
            </div>

            {req?.hospitalName && (
              <div className="rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950 px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                  Hospital
                </p>

                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 line-clamp-1">
                  {req?.hospitalName}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
        <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
          {req?.donationStatus}
        </span>

        <Link
          href={`/dashboard/donation-requests/${req?._id}`}
          className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          View Details
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
