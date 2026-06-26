"use client";

import React, {
  useTransition,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  Shield,
  SlidersHorizontal,
  UserCheck,
  UserX,
} from "lucide-react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth/auth-client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AllUsersClient({
  users,
  total,
  currentPage,
  limit,
  currentStatus,
}) {
  const router = useRouter();

  const pathname = usePathname();

  const [isPending, startTransition] =
    useTransition();

  const totalPages = Math.ceil(
    total / limit,
  );

  const updateURL = (
    page,
    status,
  ) => {
    const params =
      new URLSearchParams();

    if (page > 1) {
      params.set(
        "page",
        page.toString(),
      );
    }

    if (
      status &&
      status !== "all"
    ) {
      params.set(
        "status",
        status,
      );
    }

    startTransition(() => {
      router.push(
        `${pathname}?${params.toString()}`,
      );
    });
  };

  const handlePageChange = (
    page,
  ) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    updateURL(
      page,
      currentStatus,
    );
  };

  const handleRoleChange =
    async (id, role) => {
      try {
        const {
          data: tokenData,
        } =
          await authClient.token();

        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/role/${id}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",

                authorization: `Bearer ${tokenData?.token}`,
              },

              body: JSON.stringify({
                role,
              }),
            },
          );

        const result =
          await res.json();

        if (result.success) {
          toast.success(
            "Role updated successfully",
          );

          router.refresh();
        } else {
          toast.error(
            result.message,
          );
        }
      } catch {
        toast.error(
          "Failed to update role",
        );
      }
    };

  const handleStatusChange =
    async (id, status) => {
      try {
        const {
          data: tokenData,
        } =
          await authClient.token();

        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/status/${id}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",

                authorization: `Bearer ${tokenData?.token}`,
              },

              body: JSON.stringify({
                status,
              }),
            },
          );

        const result =
          await res.json();

        if (result.success) {
          toast.success(
            "Status updated successfully",
          );

          router.refresh();
        } else {
          toast.error(
            result.message,
          );
        }
      } catch {
        toast.error(
          "Failed to update status",
        );
      }
    };

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 py-8 space-y-6 transition-opacity duration-200 ${
        isPending
          ? "opacity-60 pointer-events-none"
          : "opacity-100"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            User Management

            <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/10">
              Admin
            </span>
          </h1>

          <p className="text-xs text-muted-foreground mt-1">
            Manage user roles and
            account restrictions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl px-3 h-10 shadow-sm">
          <SlidersHorizontal className="size-3.5 text-zinc-400" />

          <Select
            key={currentStatus}
            defaultValue={
              currentStatus
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
            <SelectTrigger className="w-[130px] h-8 text-xs font-semibold border-none bg-transparent focus:ring-0 focus:ring-offset-0 shadow-none">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Users
              </SelectItem>

              <SelectItem value="active">
                Active
              </SelectItem>

              <SelectItem value="blocked">
                Blocked
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {users.length > 0 ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Name
                  </TableHead>

                  <TableHead>
                    Email
                  </TableHead>

                  <TableHead>
                    Role
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map(
                  (user) => (
                    <TableRow
                      key={
                        user._id
                      }
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">
                            {
                              user.name
                            }
                          </span>

                          <span className="text-[10px] text-muted-foreground">
                            {
                              user._id
                            }
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {
                          user.email
                        }
                      </TableCell>

                      <TableCell>
                        <Select
                          defaultValue={
                            user.role
                          }
                          onValueChange={(
                            value,
                          ) =>
                            handleRoleChange(
                              user._id,
                              value,
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="donor">
                              Donor
                            </SelectItem>

                            <SelectItem value="volunteer">
                              Volunteer
                            </SelectItem>

                            <SelectItem value="admin">
                              Admin
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                            user.status ===
                            "active"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {
                            user.status
                          }
                        </span>
                      </TableCell>

                      <TableCell className="text-right">
                        {user.status ===
                        "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(
                                user._id,
                                "blocked",
                              )
                            }
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-red-200 text-red-500"
                          >
                            <UserX className="size-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(
                                user._id,
                                "active",
                              )
                            }
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-emerald-200 text-emerald-500"
                          >
                            <UserCheck className="size-4" />
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(
                      e,
                    ) => {
                      e.preventDefault();

                      handlePageChange(
                        currentPage -
                          1,
                      );
                    }}
                    className={
                      currentPage ===
                      1
                        ? "pointer-events-none opacity-40"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, i) =>
                    i + 1,
                ).map((page) => (
                  <PaginationItem
                    key={page}
                  >
                    <PaginationLink
                      href="#"
                      isActive={
                        currentPage ===
                        page
                      }
                      onClick={(
                        e,
                      ) => {
                        e.preventDefault();

                        handlePageChange(
                          page,
                        );
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(
                      e,
                    ) => {
                      e.preventDefault();

                      handlePageChange(
                        currentPage +
                          1,
                      );
                    }}
                    className={
                      currentPage ===
                      totalPages
                        ? "pointer-events-none opacity-40"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        <div className="w-full min-h-[300px] flex flex-col items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <Shield className="size-8 text-zinc-400" />

          <p className="text-xs text-muted-foreground mt-2">
            No users found.
          </p>
        </div>
      )}
    </div>
  );
}