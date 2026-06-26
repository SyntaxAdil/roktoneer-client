"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight, Activity, Trash2, Edit2 } from "lucide-react";

export default function MyDonationReqCard({ req, onDelete }) {
  const statusColors = {
    pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    inprogress: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    done: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    canceled: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  };

  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-all w-full select-none h-full group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="p-2.5 bg-red-50 dark:bg-red-950/30 rounded-xl text-red-500 border border-red-500/10">
            <Activity className="size-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusColors[req.donationStatus] || statusColors.pending}`}>
              {req.donationStatus}
            </span>
            <div className="h-9 w-9 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-black text-xs flex items-center justify-center border border-red-500/20 shadow-sm shrink-0">
              {req.bloodGroup}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1">
            {req.recipientName}
          </h4>
          
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
            <span className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
              <MapPin className="size-3.5 text-red-500 shrink-0" />
              <span className="truncate">{req.recipientDistrict}, {req.recipientUpazila}</span>
            </span>
            <span className="flex items-center gap-2 text-xs text-zinc-400">
              <Calendar className="size-3.5 shrink-0" />
              <span className="truncate">{req.donationDate}</span>
            </span>
            <span className="flex items-center gap-2 text-xs text-zinc-400">
              <Clock className="size-3.5 shrink-0" />
              <span className="truncate">{req.donationTime}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/my-requests/edit/${req._id}`}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <Edit2 className="size-3.5" />
          </Link>
          <button
            onClick={() => onDelete(req._id)}
            className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>

        <Link
          href={`/dashboard/my-requests/${req._id}`}
          className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          Details 
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}