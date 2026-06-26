"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  MoreVertical,
  Loader2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors = {
  pending: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-900/30",
  inprogress: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-900/30",
  done: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-900/30",
  canceled: "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700/40",
};

export default function MyDonationReqCard({ req, onDelete }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (status) => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/status/${req._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({ donationStatus: status }),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success(`Marked as ${status}`);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group flex flex-col justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 w-full h-full select-none">
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-red-500 dark:bg-red-600 font-bold text-sm flex items-center justify-center text-white tracking-wider shrink-0 shadow-sm shadow-red-500/10">
              {req.bloodGroup}
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {req.recipientName}
              </h4>
              <div className="mt-1 flex items-center">
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${statusColors[req.donationStatus]}`}>
                  {req.donationStatus}
                </span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                {loading ? (
                  <Loader2 className="size-3.5 animate-spin text-red-500" />
                ) : (
                  <MoreVertical className="size-3.5" />
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 rounded-xl border-zinc-200 dark:border-zinc-800 p-1">
              {req.donationStatus === "inprogress" && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("done")}
                    className="text-emerald-600 dark:text-emerald-400 focus:bg-emerald-50 dark:focus:bg-emerald-950/20 flex items-center gap-2 text-xs font-medium cursor-pointer rounded-lg py-2"
                  >
                    <CheckCircle2 className="size-4" /> Mark as Done
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("canceled")}
                    className="text-zinc-600 dark:text-zinc-400 focus:bg-zinc-50 dark:focus:bg-zinc-800/50 flex items-center gap-2 text-xs font-medium cursor-pointer rounded-lg py-2"
                  >
                    <XCircle className="size-4" /> Cancel Request
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem
                onClick={() => onDelete(req._id)}
                className="text-rose-600 dark:text-rose-400 focus:bg-rose-50 dark:focus:bg-rose-950/20 flex items-center gap-2 text-xs font-medium cursor-pointer rounded-lg py-2"
              >
                <Trash2 className="size-4" /> Delete Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2.5 py-4 my-1 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
            <MapPin className="size-3.5 text-zinc-400 shrink-0 mt-0.5" />
            <span className="truncate font-medium">{req.recipientDistrict}, {req.recipientUpazila}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Calendar className="size-3.5 text-zinc-400 shrink-0" />
              <span className="truncate font-medium">{req.donationDate}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Clock className="size-3.5 text-zinc-400 shrink-0" />
              <span className="truncate font-medium">{req.donationTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
        <div>
          {req.donationStatus === "pending" ? (
            <Link
              href={`/dashboard/my-requests/${req._id}/edit`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              <Edit3 className="size-3.5" />
              Edit
            </Link>
          ) : (
            <div />
          )}
        </div>

        <Link
          href={`/dashboard/my-requests/${req._id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors group/btn"
        >
          <Eye className="size-3.5" />
          Details
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}