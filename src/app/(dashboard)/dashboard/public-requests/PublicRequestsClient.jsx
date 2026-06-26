"use client";

import React, { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Eye,
  MapPin,
  Calendar,
  Clock,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import NoDonationRequest from "@/components/dashboard/NoDonationRequest";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/auth-client";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-amber-600 bg-amber-500/10 border-amber-500/20 dark:text-amber-400";
    case "inprogress":
      return "text-blue-600 bg-blue-500/10 border-blue-500/20 dark:text-blue-400";
    case "done":
      return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400";
    case "canceled":
      return "text-rose-600 bg-rose-500/10 border-rose-500/20 dark:text-rose-400";
    default:
      return "text-zinc-600 bg-zinc-500/10 border-zinc-500/20";
  }
};

export default function PublicRequestsClient({
  requests,
  total,
  currentPage,
  limit,
  userRole,
  currentStatus,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(total / limit);

  const updateURL = (newPage, newStatus) => {
    const params = new URLSearchParams();

    if (newPage > 1) {
      params.set("page", newPage.toString());
    }

    if (newStatus && newStatus !== "all") {
      params.set("status", newStatus);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    updateURL(page, currentStatus);
  };

  const handleStatusChange = async (id, current, next) => {
    if (current === "pending" && next !== "inprogress") {
      return toast.error("Pending can only move to inprogress");
    }

    if (current === "inprogress" && !["done", "canceled"].includes(next)) {
      return toast.error("Inprogress can only move to done or canceled");
    }

    if (["done", "canceled"].includes(current)) {
      return toast.error("Completed request can't be updated");
    }

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            donationStatus: next,
          }),
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Status updated successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Request deleted successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete request");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 py-8 space-y-6 select-none transition-opacity duration-200 ${
        isPending ? "opacity-60 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            Management Panel
            <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/10">
              {userRole}
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Monitor records, update urgency pipelines, and filter criteria listings.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl px-3 h-10 shadow-sm w-fit">
          <SlidersHorizontal className="size-3.5 text-zinc-400" />
          <Select
            key={currentStatus}
            defaultValue={currentStatus || "all"}
            onValueChange={(value) => updateURL(1, value)}
          >
            <SelectTrigger className="w-[130px] h-8 text-xs font-semibold border-none bg-transparent focus:ring-0 focus:ring-offset-0 p-0 shadow-none cursor-pointer text-zinc-700 dark:text-zinc-300">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
              <SelectItem value="all" className="text-xs font-medium rounded-lg">
                All Status
              </SelectItem>
              <SelectItem value="pending" className="text-xs font-medium rounded-lg">
                Pending
              </SelectItem>
              <SelectItem value="inprogress" className="text-xs font-medium rounded-lg">
                In Progress
              </SelectItem>
              <SelectItem value="done" className="text-xs font-medium rounded-lg">
                Done
              </SelectItem>
              <SelectItem value="canceled" className="text-xs font-medium rounded-lg">
                Canceled
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {requests.length > 0 ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <Table>
              <TableHeader className="bg-zinc-50/70 dark:bg-zinc-900/50">
                <TableRow className="border-b border-zinc-200/60 dark:border-zinc-800/60">
                  <TableHead>Recipient</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Manage Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => {
                  const isCompleted = ["done", "canceled"].includes(req.donationStatus);
                  return (
                    <TableRow key={req._id}>
                      <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                        {req.recipientName}
                      </TableCell>
                      <TableCell className="font-semibold text-red-600 dark:text-red-400">
                        {req.bloodGroup}
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-xs">
                          <MapPin className="size-3 text-zinc-400" />
                          {req.recipientDistrict}, {req.recipientUpazila}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3 text-zinc-400" />
                            {req.donationDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3 text-zinc-400" />
                            {req.donationTime}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          disabled={isCompleted}
                          defaultValue={req.donationStatus}
                          onValueChange={(value) =>
                            handleStatusChange(req._id, req.donationStatus, value)
                          }
                        >
                          <SelectTrigger
                            className={`w-[135px] h-8 text-xs font-semibold rounded-lg border px-2.5 capitalize ${getStatusColor(
                              req.donationStatus
                            )} ${isCompleted ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
                            <SelectItem value="pending" className="text-xs font-medium rounded-lg">
                              Pending
                            </SelectItem>
                            <SelectItem value="inprogress" className="text-xs font-medium rounded-lg">
                              In Progress
                            </SelectItem>
                            <SelectItem value="done" className="text-xs font-medium rounded-lg">
                              Done
                            </SelectItem>
                            <SelectItem value="canceled" className="text-xs font-medium rounded-lg">
                              Canceled
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-lg"
                            onClick={() =>
                              router.push(`/dashboard/donation-requests/${req._id}`)
                            }
                          >
                            <Eye className="size-4 text-zinc-500" />
                          </Button>
                          {userRole === "admin" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-lg hover:bg-rose-500/10 hover:text-rose-600 group"
                              onClick={() => handleDelete(req._id)}
                            >
                              <Trash2 className="size-4 text-zinc-500 group-hover:text-rose-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        <NoDonationRequest />
      )}
    </div>
  );
}