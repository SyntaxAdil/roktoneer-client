"use client";

import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "text-amber-600 bg-amber-500/10 border-amber-500/10";
    case "inprogress":
      return "text-blue-600 bg-blue-500/10 border-blue-500/10";
    case "done":
      return "text-emerald-600 bg-emerald-500/10 border-emerald-500/10";
    case "canceled":
      return "text-rose-600 bg-rose-500/10 border-rose-500/10";
    default:
      return "text-zinc-600 bg-zinc-500/10 border-zinc-500/10";
  }
};

export default function RecentRequestsTable({
  requests,
  role,
}) {
  return (
    <div className="p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Latest Requests
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {role === "admin" || role === "volunteer"
              ? "Latest blood requests from all donors."
              : "Your latest blood requests."}
          </p>
        </div>

        <Link
          href={
            role === "donor"
              ? "/dashboard/my-requests"
              : "/dashboard/public-requests"
          }
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          View All <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50/70 dark:bg-zinc-900/50">
            <TableRow className="border-b border-zinc-200/60 dark:border-zinc-800/60">
              <TableHead className="text-xs">Recipient</TableHead>
              <TableHead className="text-xs">Blood Group</TableHead>
              <TableHead className="text-xs">Location</TableHead>
              <TableHead className="text-xs">Schedule</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <TableRow
                  key={req._id}
                  className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0"
                >
                  <TableCell className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
                    {req.recipientName}
                  </TableCell>

                  <TableCell className="font-bold text-xs text-red-600 dark:text-red-400">
                    {req.bloodGroup}
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
                      <MapPin className="size-3 text-zinc-400" />
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col text-[11px] text-zinc-600 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3 text-zinc-400" />
                        {req.donationDate || req.date}
                      </span>
                      <span className="flex items-center gap-1 mt-0.5">
                        <Clock className="size-3 text-zinc-400" />
                        {req.donationTime || req.time}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border capitalize ${getStatusStyle(
                        req.donationStatus
                      )}`}
                    >
                      {req.donationStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-xs text-muted-foreground"
                >
                  No requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}