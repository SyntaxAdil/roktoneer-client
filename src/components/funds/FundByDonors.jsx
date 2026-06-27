"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Heart,
  DollarSign,
  Users,
  Calendar,
  ArrowUpRight
} from "lucide-react";

export default function FundByDonors({
  initialUsers = [],
  initialTotalFunds = 0
}) {

  const [users, setUsers] = useState(initialUsers);
  const [totalFunds, setTotalFunds] = useState(initialTotalFunds);

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 6;

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchUsers = async (page = 1) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/funds/users?page=${page}&limit=${itemsPerPage}`,
        {
          cache: "no-store"
        }
      );

      const data = await res.json();

      if (data.success) {
        setUsers(data.users || []);
        setTotalUsers(data.totalUsers || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchUsers(currentPage);
    }, 0);
  }, [currentPage]);

const handleGiveFund = async (e) => {

  e.preventDefault();

  if (!amount) return;

  try {

    const res = await fetch("/api/checkout_sessions", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        amount: Number(amount)
      })

    });

    const result = await res.json();

    if (result?.success && result?.url) {

      window.location.href = result.url;

    }

  } catch (err) {

    console.error(err);

  }

};

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

    } catch {
      return "N/A";
    }
  };

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <DollarSign className="size-4 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Total Raised
            </span>
          </div>

          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1">
            ৳{totalFunds > 0 ? totalFunds.toLocaleString() : "0"}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Users className="size-4 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Financial Backers
            </span>
          </div>

          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1">
            {totalUsers}
          </p>
        </div>

      </div>

      <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden flex flex-col h-[360px]">

        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between shrink-0">

          <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
            Recent Contributors
          </h3>

          <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold uppercase tracking-wider text-[11px] gap-1.5 h-8 shadow-sm transition-colors"
              >
                <Heart className="size-3.5 fill-current" />
                Give Fund
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">

              <DialogHeader>
                <DialogTitle className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  Support Roktoneer Pipeline
                </DialogTitle>

                <DialogDescription className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Your financial contribution keeps our real-time emergency blood pipelines alive and free.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleGiveFund}
                className="space-y-4 py-4"
              >

                <div className="space-y-2">

                  <Label
                    htmlFor="amount"
                    className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                  >
                    Amount (BDT)
                  </Label>

                  <div className="relative">

                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />

                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-9 rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-red-500"
                      required
                    />

                  </div>

                </div>

                <DialogFooter className="flex sm:justify-end gap-2 pt-2">

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="rounded-xl text-xs font-bold uppercase tracking-wider h-9"
                  >
                    Maybe Later
                  </Button>

                  <Button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider h-9"
                  >
                    Confirm Fund
                  </Button>

                </DialogFooter>

              </form>

            </DialogContent>

          </Dialog>

        </div>

        <div className="overflow-x-auto flex-1 px-2">

          <Table>

            <TableHeader className="bg-white dark:bg-zinc-900 sticky top-0 z-10">

              <TableRow className="border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-transparent">

                <TableHead className="text-[11px] font-bold uppercase tracking-wider h-10 text-zinc-400 pl-3">
                  Donor
                </TableHead>

                <TableHead className="text-[11px] font-bold uppercase tracking-wider h-10 text-zinc-400">
                  Fund Date
                </TableHead>

                <TableHead className="text-[11px] font-bold uppercase tracking-wider h-10 text-zinc-400 text-right pr-3">
                  Amount
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {users.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={3}
                    className="h-48 text-center"
                  >

                    <div className="flex flex-col items-center justify-center gap-2 text-zinc-400">

                      <Heart className="size-6 opacity-20" />

                      <p className="text-xs font-medium uppercase tracking-wider">
                        No contributions yet
                      </p>

                      <p className="text-[10px]">
                        Be the first to support our pipeline!
                      </p>

                    </div>

                  </TableCell>

                </TableRow>

              ) : (

                users.map((item, index) => (

                  <TableRow
                    key={index}
                    className="border-b border-zinc-100/40 dark:border-zinc-800/20 last:border-0 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors group"
                  >

                    <TableCell className="py-3 pl-3 font-semibold text-xs text-zinc-800 dark:text-zinc-200">

                      <div className="flex items-center gap-2">

                        <div className="size-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 group-hover:bg-red-50 dark:group-hover:bg-red-950/30 group-hover:text-red-500 transition-colors uppercase">
                          {item?.name
                            ? item.name.substring(0, 2)
                            : "UD"}
                        </div>

                        <span>
                          {item?.name || "Unknown Donor"}
                        </span>

                      </div>

                    </TableCell>

                    <TableCell className="py-3 text-xs text-zinc-500 dark:text-zinc-400">

                      <div className="flex items-center gap-1.5 opacity-85">

                        <Calendar className="size-3 text-zinc-400" />

                        <span>
                          {formatDate(item?.createdAt || item?.fundDate)}
                        </span>

                      </div>

                    </TableCell>

                    <TableCell className="py-3 text-right pr-3 font-black text-xs text-emerald-600 dark:text-emerald-400">

                      <div className="flex items-center justify-end gap-1">

                        <span>
                          ৳
                          {(item?.fund !== undefined &&
                            item?.fund !== null)
                            ? item.fund.toLocaleString()
                            : "0"}
                        </span>

                        <ArrowUpRight className="size-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-200 text-emerald-500" />

                      </div>

                    </TableCell>

                  </TableRow>

                ))

              )}

            </TableBody>

          </Table>

        </div>

        {totalPages > 1 && (

          <div className="p-2 border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/10 shrink-0">

            <Pagination>

              <PaginationContent className="flex items-center gap-1">

                <PaginationItem>

                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();

                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    className={`h-7 px-2 text-[11px] font-bold uppercase tracking-wider rounded-lg ${
                      currentPage === 1
                        ? "pointer-events-none opacity-40"
                        : ""
                    }`}
                  />

                </PaginationItem>

                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((page) => (

                  <PaginationItem key={page}>

                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      className={`size-7 text-[11px] font-bold rounded-lg ${
                        currentPage === page
                          ? "bg-red-50 dark:bg-red-950/40 text-red-500 border-red-200 dark:border-red-900/50"
                          : ""
                      }`}
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

                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    className={`h-7 px-2 text-[11px] font-bold uppercase tracking-wider rounded-lg ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-40"
                        : ""
                    }`}
                  />

                </PaginationItem>

              </PaginationContent>

            </Pagination>

          </div>

        )}

      </div>

    </div>
  );
}