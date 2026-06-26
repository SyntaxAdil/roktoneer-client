"use client";

import React, {
  useTransition,
  useState,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import { motion } from "motion/react";

import { SlidersHorizontal } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import MyDonationReqCard from "../../../../components/dashboard/MyDonationReqCard";

import NoDonationRequest from "../../../../components/dashboard/NoDonationRequest";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth/auth-client";

export default function DonationRequestsClient({
  initialRequests,
  total,
  currentPage,
  currentStatus,
}) {
  const router = useRouter();

  const pathname = usePathname();

  const [isPending, startTransition] =
    useTransition();

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  const limit = 4;

  const updateURL = (
    newPage,
    newStatus,
  ) => {
    const params = new URLSearchParams();

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
      params.set("status", newStatus);
    }

    startTransition(() => {
      router.push(
        `${pathname}?${params.toString()}`,
      );
    });
  };

  const executeDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);

    try {
      const { data: tokenData } =
        await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/${deleteId}`,
        {
          method: "DELETE",

          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success(
          "Request deleted successfully",
        );

        router.refresh();
      } else {
        toast.error(
          result.message ||
            "Failed to delete",
        );
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);

      setDeleteId(null);
    }
  };

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 py-8 space-y-8 select-none transition-opacity duration-200 ${
        isPending ||
        isDeleting
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
            onValueChange={(value) =>
              updateURL(1, value)
            }
          >
            <SelectTrigger className="w-[130px] h-8 text-xs font-semibold border-none bg-transparent focus:ring-0 focus:ring-offset-0 p-0 shadow-none cursor-pointer text-zinc-700 dark:text-zinc-300">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
              <SelectItem value="all">
                All Status
              </SelectItem>

              <SelectItem value="pending">
                Pending
              </SelectItem>

              <SelectItem value="inprogress">
                In Progress
              </SelectItem>

              <SelectItem value="done">
                Done
              </SelectItem>

              <SelectItem value="canceled">
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
                    setDeleteId
                  }
                />
              ),
            )}
          </motion.div>

          {total > limit && (
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-100/10">
              <button
                disabled={
                  currentPage ===
                    1 || isPending
                }
                onClick={() =>
                  updateURL(
                    currentPage - 1,
                    currentStatus,
                  )
                }
                className="px-3 h-8 text-xs font-bold border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-xs font-bold px-2 text-zinc-500">
                Page{" "}
                {currentPage} of{" "}
                {Math.ceil(
                  total / limit,
                )}
              </span>

              <button
                disabled={
                  currentPage >=
                    Math.ceil(
                      total /
                        limit,
                    ) || isPending
                }
                onClick={() =>
                  updateURL(
                    currentPage + 1,
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

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) =>
          !open &&
          setDeleteId(null)
        }
      >
        <AlertDialogContent className="rounded-2xl max-w-md border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Are you absolutely
              sure?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
              This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="rounded-xl mr-2">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={executeDelete}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white"
            >
              Delete Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}