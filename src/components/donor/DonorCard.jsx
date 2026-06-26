"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  HeartPulse,
  Building2,
} from "lucide-react";

export default function DonorCard({ donor }) {
  return (
    <div className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      
      <div className="flex items-center gap-4 min-w-0 flex-1">

        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md">
          <HeartPulse className="size-6" />

          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white dark:border-zinc-900 bg-white dark:bg-zinc-900 text-[10px] font-black text-red-600 dark:text-red-400 shadow-sm">
            {donor.bloodGroup}
          </div>
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">
            
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-black text-zinc-900 dark:text-zinc-50">
                {donor.recipientName}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                <Building2 className="size-3 text-red-500 shrink-0" />
                <span className="truncate">
                  {donor.hospitalName}
                </span>
              </div>
            </div>

           
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            
            <span className="flex items-center gap-1 whitespace-nowrap">
              <MapPin className="size-3 text-red-500 shrink-0" />
              {donor.recipientDistrict}
            </span>

            <span className="flex items-center gap-1 whitespace-nowrap">
              <Calendar className="size-3 text-red-500 shrink-0" />
              {donor.donationDate}
            </span>

            <span className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="size-3 text-red-500 shrink-0" />
              {donor.donationTime}
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 self-center flex  items-center gap-4">
         <div className="shrink-0 pt-0.5">
              <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 whitespace-nowrap ">
                {donor.donationStatus}
              </span>
            </div>
        <Link
          href={`/dashboard/donation-requests/${donor._id}`}
          className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-600 transition-all hover:border-red-500 hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400 whitespace-nowrap"
        >
          Details
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}