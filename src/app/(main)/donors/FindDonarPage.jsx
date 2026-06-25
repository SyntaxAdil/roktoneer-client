"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Search, AlertTriangle } from "lucide-react";
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

export default function FindDonorPage({ initialDonors = [] }) {
  // Backend dynamic state
  const [districtId, setDistrictId] = useState("");
  const [donors, setDonors] = useState(initialDonors);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { bloodGroup: "", district: "", upazila: "" },
  });

  const selectedBloodGroup = watch("bloodGroup");
  const selectedDistrict = watch("district");
  const selectedUpazila = watch("upazila");

  // Query submission
  const onSubmit = async (data) => {
    console.log("Form query payload:", data);
    /* const res = await fetch(`/api/donors?group=${data.bloodGroup}&district=${data.district}&upazila=${data.upazila}`);
      const backendData = await res.json();
      setDonors(backendData);
    */
  };

  return (
    <section className="w-full py-10 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8  container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full"
          >
            Live Database
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Find Blood Donors <span className="text-red-600">Near You</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400"
          >
            Locate life-savers in your immediate vicinity. Access our community
            database when every second counts.
          </motion.p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Group Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Blood Group
                </label>
                <Select
                  value={selectedBloodGroup || ""}
                  onValueChange={(value) =>
                    setValue("bloodGroup", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="w-full h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 rounded-xl text-left text-zinc-900 dark:text-zinc-100 font-medium">
                    <SelectValue placeholder="Choose Blood Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                    <SelectGroup>
                      {bloodGroupsInfo.map((item, idx) => (
                        <SelectItem key={idx} value={item.group}>
                          {item.group}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* District Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  District
                </label>
                <Select
                  value={selectedDistrict || ""}
                  onValueChange={(value) => {
                    setDistrictId(value);
                    setValue("district", value, { shouldValidate: true });
                    setValue("upazila", "", { shouldValidate: false });
                  }}
                >
                  <SelectTrigger className="w-full h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 rounded-xl text-left text-zinc-900 dark:text-zinc-100 font-medium">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                    <SelectGroup>
                      {bdDistricts.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("district", {
                    required: "District is required",
                  })}
                />
                {errors.district && (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Upazila Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Upazila / Area
                </label>
                <Select
                  disabled={!districtId}
                  value={selectedUpazila || ""}
                  onValueChange={(value) =>
                    setValue("upazila", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="w-full h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 rounded-xl text-left text-zinc-900 dark:text-zinc-100 font-medium disabled:opacity-50">
                    <SelectValue
                      placeholder={
                        districtId ? "Enter area name" : "Select district first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                    <SelectGroup>
                      {bdUpazilas
                        .filter((u) => u.district_id === String(districtId))
                        .map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("upazila", {
                    required: "Upazila/Area is required",
                  })}
                />
                {errors.upazila && (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.upazila.message}
                  </p>
                )}
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 select-none"
              >
                <Search className="size-4" />
                Update Search
              </button>
            </form>

            {/* Emergency Prompt */}
            <div className="flex items-start gap-3 p-4 bg-red-500/5 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-red-500/10">
              <AlertTriangle className="size-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                  Urgent Need?
                </h4>
                <p className="text-[11px] text-muted-foreground leading-normal font-medium">
                  If this is an emergency and you cannot locate matching active
                  donors, instantly broadcast an urgent target request.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Results Pipeline Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-4 w-full h-full justify-start"
          >
            <div className="flex items-center justify-between px-2 mb-1">
              <h3 className="text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Available Donors
              </h3>
              <span className="text-xs font-bold text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800 dark:text-zinc-400 px-2 py-0.5 rounded-md">
                {donors.length} Match Found
              </span>
            </div>

            {donors.length > 0 ? (
              <div className="flex flex-col gap-4 w-full">
                {donors.map((donor) => (
                  <DonorCard key={donor.id || donor._id} donor={donor} />
                ))}
              </div>
            ) : (
              <NoDonor targetedGroup={selectedBloodGroup} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
