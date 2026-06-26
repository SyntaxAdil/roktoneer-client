"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Phone,
  User,
  ShieldCheck,
} from "lucide-react";

export default function DonorCard({ donor }) {
  const currentStatus = donor?.status?.toLowerCase() || "active";
  const statusLabel = currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1);

  const statusStyles = {
    active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    inactive: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20",
  };

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start gap-4 min-w-0 flex-1">
        <div className="relative shrink-0">
          {donor?.image ? (
            <div className="h-16 w-16 relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <Image
                src={donor.image}
                alt={donor?.name || "Donor"}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-white shadow-lg">
              <User className="size-7" />
              <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-[2px]" />
            </div>
          )}

          <div className="absolute -bottom-2 -right-2 flex h-7 min-w-7 items-center justify-center rounded-xl border-2 border-white dark:border-zinc-900 bg-white dark:bg-zinc-950 px-1.5 text-xs font-black text-red-600 dark:text-red-400 shadow-md">
            {donor?.bloodGroup || "N/A"}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  {donor?.name || "Anonymous Donor"}
                </h3>
                {donor?.role === "donor" && (
                  <span className="inline-flex items-center gap-0.5 rounded bg-red-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    Donor
                  </span>
                )}
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <Phone className="size-3.5 text-red-500 shrink-0" />
                <span className="truncate">
                  {donor?.phoneNumber || "No Phone Number"}
                </span>
              </div>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                statusStyles[currentStatus] || statusStyles.active
              }`}
            >
              <ShieldCheck className="size-3" />
              {statusLabel}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/70 px-2.5 py-1">
              <MapPin className="size-3 text-red-500 shrink-0" />
              {donor?.upazila ? `${donor.upazila}, ${donor?.district || ""}` : donor?.district || "Unknown Location"}
            </span>

            {donor?.createdAt && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/70 px-2.5 py-1">
                <Calendar className="size-3 text-red-500 shrink-0" />
                Joined: {new Date(donor.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-stretch sm:justify-center shrink-0 w-full sm:w-auto">
        {donor?.phoneNumber ? (
          <a
            href={`tel:${donor.phoneNumber}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-md shadow-red-500/10"
          >
            <Phone className="size-4 animate-pulse" />
            <span>Call Now</span>
          </a>
        ) : (
          <button
            disabled
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 font-semibold text-sm px-6 py-3 rounded-xl cursor-not-allowed"
          >
            <Phone className="size-4" />
            <span>Unavailable</span>
          </button>
        )}
      </div>
    </div>
  );
}