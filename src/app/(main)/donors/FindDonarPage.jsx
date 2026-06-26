"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import {
  Search,
  AlertTriangle,
  Loader2,
  MapPin,
} from "lucide-react";

import {
  bdDistricts,
  bdUpazilas,
  bloodGroupsInfo,
} from "../../../assets/staticDatas";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import NoDonor from "../../../components/donor/NoDonor";
import DonorCard from "../../../components/donor/DonorCard";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

export default function FindDonorPage({
  initialRequests = [],
  initialTotalPages = 1,
  initialTotalItems = 0,
}) {
  const [districtId, setDistrictId] = useState("");
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalItems, setTotalItems] = useState(initialTotalItems);

  const [searched, setSearched] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      bloodGroup: "",
      district: "",
      upazila: "",
    },
  });

  const selectedBloodGroup = watch("bloodGroup");
  const selectedDistrict = watch("district");
  const selectedUpazila = watch("upazila");

  const districtName =
    bdDistricts.find((d) => d.id === selectedDistrict)?.name || "";

  const upazilaName =
    bdUpazilas.find((u) => u.id === selectedUpazila)?.name || "";

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        page: pageNumber,
        limit: 6,
        ...(selectedBloodGroup && {
          bloodGroup: selectedBloodGroup,
        }),
        ...(districtName && {
          district: districtName,
        }),
        ...(upazilaName && {
          upazila: upazilaName,
        }),
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/donors?${queryParams.toString()}`
      );

      const result = await res.json();

      if (result.success) {
        setRequests(result.data || []);
        setTotalPages(result.totalPages || 1);
        setTotalItems(result.totalItems || 0);
        setCurrentPage(pageNumber);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    setSearched(true);
    fetchData(1);
  };

  const handlePageChange = (newPage, e) => {
    if (e) e.preventDefault();

    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage);
    }
  };

  return (
    <section className="w-full py-10 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full"
          >
            Live Donor Network
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Find Blood Donors{" "}
            <span className="text-red-600">Near You</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400"
          >
            Search active blood donors by group and location.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6"
          >

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Blood Group
                </label>

                <Select
                  value={selectedBloodGroup || ""}
                  onValueChange={(value) =>
                    setValue("bloodGroup", value)
                  }
                >
                  <SelectTrigger className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                    <SelectValue placeholder="Choose Blood Group" />
                  </SelectTrigger>

                  <SelectContent>
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

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  District
                </label>

                <Select
                  value={selectedDistrict || ""}
                  onValueChange={(value) => {
                    setDistrictId(value);
                    setValue("district", value);
                    setValue("upazila", "");
                  }}
                >
                  <SelectTrigger className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {bdDistricts.map((district) => (
                        <SelectItem
                          key={district.id}
                          value={district.id}
                        >
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <input type="hidden" {...register("district")} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Upazila
                </label>

                <Select
                  disabled={!districtId}
                  value={selectedUpazila || ""}
                  onValueChange={(value) =>
                    setValue("upazila", value)
                  }
                >
                  <SelectTrigger className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 disabled:opacity-50">
                    <SelectValue
                      placeholder={
                        districtId
                          ? "Select Upazila"
                          : "Select District First"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {bdUpazilas
                        .filter(
                          (u) =>
                            u.district_id === String(districtId)
                        )
                        .map((u) => (
                          <SelectItem
                            key={u.id}
                            value={u.id}
                          >
                            {u.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <input type="hidden" {...register("upazila")} />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}

                Search Donors
              </button>
            </form>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
              <MapPin className="size-5 text-red-500 shrink-0 mt-0.5" />

              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wide text-red-500">
                  Search by Area
                </h4>

                <p className="text-[11px] text-muted-foreground leading-normal">
                  You can search donors from a specific district
                  and upazila.
                </p>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 flex flex-col gap-4"
          >

            {searched && (
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">
                  Available Donors
                </h3>

                <span className="text-xs font-bold text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800 px-2 py-1 rounded-md">
                  {totalItems} Found
                </span>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-2">
                <Loader2 className="size-8 animate-spin text-red-500" />

                <p className="text-xs text-zinc-400">
                  Searching donors...
                </p>
              </div>
            ) : !searched ? (
              <NoDonor isInitial />
            ) : requests.length > 0 ? (
              <div className="space-y-4">

                {requests.map((donor) => (
                  <DonorCard
                    key={donor._id}
                    donor={donor}
                  />
                ))}

                {totalPages > 1 && (
                  <div className="pt-6 flex justify-center">
                    <Pagination>
                      <PaginationContent>

                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) =>
                              handlePageChange(
                                currentPage - 1,
                                e
                              )
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
                                  isActive={
                                    currentPage === page
                                  }
                                  onClick={(e) =>
                                    handlePageChange(
                                      page,
                                      e
                                    )
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
                              handlePageChange(
                                currentPage + 1,
                                e
                              )
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
              <NoDonor
                targetedGroup={selectedBloodGroup}
              />
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
}