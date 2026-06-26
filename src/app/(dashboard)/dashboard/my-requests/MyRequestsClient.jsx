"use client";

import React, {
  useTransition,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import { motion } from "motion/react";

import {
  Loader2,
  SlidersHorizontal,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import toast from "react-hot-toast";

import {
  authClient,
} from "@/lib/auth/auth-client";

import MyDonationReqCard from "../../../../components/dashboard/MyDonationReqCard";

import NoDonationRequest from "../../../../components/dashboard/NoDonationRequest";

export default function MyRequestsClient({
  initialRequests,
  total,
  currentPage,
  currentStatus,
}) {
  const router = useRouter();

  const pathname = usePathname();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const limit = 4;

  const updateURL = (
    newPage,
    newStatus,
  ) => {
    const params =
      new URLSearchParams();

    if (newPage > 1) {
      params.set(
        "page",
        newPage.toString(),
      );
    }

    if (
      newStatus &&
      newStatus !== "all"
    ) {
      params.set(
        "status",
        newStatus,
      );
    }

    startTransition(() => {
      router.push(
        `${pathname}?${params.toString()}`,
      );
    });
  };

  const handleDelete = async (
    id,
  ) => {
    if (
      !confirm(
        "Are you sure you want to delete this request?",
      )
    ) {
      return;
    }

    try {
      const { data: tokenData } =
        await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/${id}`,
        {
          method: "DELETE",

          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const result =
        await res.json();

      if (result.success) {
        toast.success(
          "Request deleted successfully",
        );

        router.refresh();
      } else {
        toast.error(
          result.message,
        );
      }
    } catch {
      toast.error(
        "Something went wrong",
      );
    }
  };

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 py-8 space-y-8 select-none transition-opacity duration-200 ${
        isPending
          ? "opacity-60 pointer-events-none"
          : "opacity-100"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            My Donation Requests
          </h1>

          <p className="text-xs text-muted-foreground mt-1">
            Manage your blood
            requirements board
            listings.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl px-3 h-10 shadow-sm w-fit">
          <SlidersHorizontal className="size-3.5 text-zinc-400" />

          <Select
            key={currentStatus}
            defaultValue={
              currentStatus || "all"
            }
            onValueChange={(
              value,
            ) =>
              updateURL(
                1,
                value,
              )
            }
          >
            <SelectTrigger className="w-[130px] h-8 text-xs font-semibold border-none bg-transparent focus:ring-0 focus:ring-offset-0 p-0 shadow-none cursor-pointer text-zinc-700 dark:text-zinc-300">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
              <SelectItem
                value="all"
                className="text-xs font-medium rounded-lg"
              >
                All Status
              </SelectItem>

              <SelectItem
                value="pending"
                className="text-xs font-medium rounded-lg"
              >
                Pending
              </SelectItem>

              <SelectItem
                value="inprogress"
                className="text-xs font-medium rounded-lg"
              >
                In Progress
              </SelectItem>

              <SelectItem
                value="done"
                className="text-xs font-medium rounded-lg"
              >
                Done
              </SelectItem>

              <SelectItem
                value="canceled"
                className="text-xs font-medium rounded-lg"
              >
                Canceled
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {initialRequests.length >
      0 ? (
        <div className="space-y-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {initialRequests.map(
              (req) => (
                <MyDonationReqCard
                  key={req._id}
                  req={req}
                  onDelete={
                    handleDelete
                  }
                />
              ),
            )}
          </motion.div>

          {total > limit && (
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-900">
              <button
                disabled={
                  currentPage ===
                    1 ||
                  isPending
                }
                onClick={() =>
                  updateURL(
                    currentPage -
                      1,
                    currentStatus,
                  )
                }
                className="px-3 h-8 text-xs font-bold border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-xs font-bold px-2 text-zinc-500">
                Page{" "}
                {
                  currentPage
                }{" "}
                of{" "}
                {Math.ceil(
                  total /
                    limit,
                )}
              </span>

              <button
                disabled={
                  currentPage >=
                    Math.ceil(
                      total /
                        limit,
                    ) ||
                  isPending
                }
                onClick={() =>
                  updateURL(
                    currentPage +
                      1,
                    currentStatus,
                  )
                }
                className="px-3 h-8 text-xs font-bold border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <NoDonationRequest />
      )}
    </div>
  );
}