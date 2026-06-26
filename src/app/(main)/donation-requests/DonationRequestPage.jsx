"use client";

import React, { useState } from "react";
import { Loader2, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

import DonationReqCard from "../../../components/donor/DonationReqCard";
import NoReq from "../../../components/donor/NoReq";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import {
  bdDistricts,
  bdUpazilas,
  bloodGroupsInfo,
} from "../../../assets/staticDatas";

export default function DonationRequestPage({
  initialRequests = [],
  initialTotalPages = 1,
  initialTotalItems = 0,
  initialPage = 1,
  initialFilters = {},
}) {
  const router = useRouter();

  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalItems, setTotalItems] = useState(initialTotalItems);

  const [bloodGroup, setBloodGroup] = useState(
    initialFilters?.bloodGroup || ""
  );

  const [district, setDistrict] = useState(
    initialFilters?.district || ""
  );

  const [upazila, setUpazila] = useState(
    initialFilters?.upazila || ""
  );

  const districtId =
    bdDistricts.find((d) => d.name === district)?.id || "";

  const fetchPageData = async (pageNumber = 1) => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        page: pageNumber,
        limit: 8,
        ...(bloodGroup && { bloodGroup }),
        ...(district && { district }),
        ...(upazila && { upazila }),
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/public-pending?${queryParams.toString()}`
      );

      const result = await res.json();

      if (result.success) {
        setRequests(result.data || []);
        setTotalPages(result.totalPages || 1);
        setTotalItems(result.totalItems || 0);
        setCurrentPage(pageNumber);

        router.push(
          `/donation-requests?${queryParams.toString()}`,
          {
            scroll: false,
          }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPageData(1);
  };

  const handlePageChange = (newPage, e) => {
    if (e) e.preventDefault();

    if (newPage >= 1 && newPage <= totalPages) {
      fetchPageData(newPage);
    }
  };

  return (
    <section className="w-full py-20 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
            Emergency Board
          </span>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Active Blood <span className="text-red-600">Requests</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Browse active emergency blood requests near your location.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 mb-10 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Filter className="size-4 text-red-500" />
            <h3 className="text-sm font-black tracking-wide text-zinc-900 dark:text-zinc-100 uppercase">
              Filter Requests
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">

            <div className="w-full min-w-0">
              <Select
                value={bloodGroup}
                onValueChange={setBloodGroup}
              >
                <SelectTrigger className="h-11 rounded-xl w-full text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-red-500/20">
                  <SelectValue placeholder="Blood Group" />
                </SelectTrigger>

                <SelectContent className="max-h-[300px]">
                  <SelectGroup>
                    {bloodGroupsInfo.map((item) => (
                      <SelectItem
                        key={item.group}
                        value={item.group}
                      >
                        {item.group}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full min-w-0">
              <Select
                value={district}
                onValueChange={(value) => {
                  setDistrict(value);
                  setUpazila("");
                }}
              >
                <SelectTrigger className="h-11 rounded-xl w-full text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-red-500/20">
                  <SelectValue placeholder="District" />
                </SelectTrigger>

                <SelectContent className="max-h-[300px]">
                  <SelectGroup>
                    {bdDistricts.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.name}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full min-w-0">
              <Select
                disabled={!district}
                value={upazila}
                onValueChange={setUpazila}
              >
                <SelectTrigger className="h-11 rounded-xl w-full text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-red-500/20 disabled:opacity-50">
                  <SelectValue placeholder="Upazila" />
                </SelectTrigger>

                <SelectContent className="max-h-[300px]">
                  <SelectGroup>
                    {bdUpazilas
                      .filter(
                        (item) =>
                          item.district_id === String(districtId)
                      )
                      .map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all w-full cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Search className="size-4" />
              )}

              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <Loader2 className="size-8 animate-spin text-red-500" />
            <p className="text-xs font-medium text-zinc-400">
              Loading requests...
            </p>
          </div>
        ) : requests.length > 0 ? (
          <div className="flex flex-col gap-10 w-full">

            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">
                Available Requests
              </h3>

              <span className="text-xs font-bold text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800 px-2 py-1 rounded-md">
                {totalItems} Found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {requests.map((req) => (
                <DonationReqCard
                  key={req._id}
                  req={req}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="py-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <Pagination>
                  <PaginationContent>

                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) =>
                          handlePageChange(currentPage - 1, e)
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-40"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    ).map((page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 &&
                          page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(e) =>
                                handlePageChange(page, e)
                              }
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }

                      return null;
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) =>
                          handlePageChange(currentPage + 1, e)
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-40"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        ) : (
          <NoReq />
        )}
      </div>
    </section>
  );
}