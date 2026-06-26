"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { authClient } from "@/lib/auth/auth-client";

import {
  bdDistricts,
  bdUpazilas,
  bloodGroupsInfo,
} from "@/assets/staticDatas";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bloodGroups = bloodGroupsInfo.map(
  (item) => item.group,
);

export default function EditDonationRequestClient({
  initialData,
  id,
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      recipientName:
        initialData?.recipientName || "",

      bloodGroup:
        initialData?.bloodGroup || "",

      recipientDistrict:
        initialData?.recipientDistrict ||
        "",

      recipientUpazila:
        initialData?.recipientUpazila ||
        "",

      hospitalName:
        initialData?.hospitalName || "",

      fullAddress:
        initialData?.fullAddress || "",

      contactNumber:
        initialData?.contactNumber || "",

      donationDate:
        initialData?.donationDate || "",

      donationTime:
        initialData?.donationTime || "",

      description:
        initialData?.description || "",
    },
  });

  const selectedBloodGroup =
    watch("bloodGroup");

  const selectedDistrict =
    watch("recipientDistrict");

  const selectedUpazila = watch(
    "recipientUpazila",
  );

  const districtId = useMemo(() => {
    const district =
      bdDistricts.find(
        (d) =>
          d.name === selectedDistrict,
      );

    return district?.id || "";
  }, [selectedDistrict]);

  const filteredUpazilas =
    bdUpazilas.filter(
      (u) =>
        String(u.district_id) ===
        String(districtId),
    );

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { data: tokenData } =
        await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            authorization: `Bearer ${tokenData?.token}`,
          },

          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success(
          "Donation request updated successfully",
        );

        router.push(
          "/dashboard/my-requests",
        );

        router.refresh();
      } else {
        toast.error(
          result.message ||
            "Failed to update request",
        );
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6 select-none">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to listings
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Edit Donation Request
        </h1>

        <p className="text-xs text-muted-foreground mt-1">
          Modify the urgency data,
          location logistics, or
          schedules for this pipeline.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(
          onSubmit,
        )}
        className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Recipient Name
            </label>

            <input
              type="text"
              {...register(
                "recipientName",
              )}
              className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Blood Group
            </label>

            <Select
              value={
                selectedBloodGroup ||
                ""
              }
              onValueChange={(
                value,
              ) =>
                setValue(
                  "bloodGroup",
                  value,
                )
              }
            >
              <SelectTrigger className="w-full h-10 rounded-xl text-xs">
                <SelectValue placeholder="Select Blood Group" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {bloodGroups.map(
                    (group) => (
                      <SelectItem
                        key={group}
                        value={group}
                      >
                        {group}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              District
            </label>

            <Select
              value={
                selectedDistrict ||
                ""
              }
              onValueChange={(
                value,
              ) => {
                setValue(
                  "recipientDistrict",
                  value,
                );

                setValue(
                  "recipientUpazila",
                  "",
                );
              }}
            >
              <SelectTrigger className="w-full h-10 rounded-xl text-xs">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {bdDistricts.map(
                    (district) => (
                      <SelectItem
                        key={
                          district.id
                        }
                        value={
                          district.name
                        }
                      >
                        {
                          district.name
                        }
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Upazila
            </label>

            <Select
              disabled={!districtId}
              value={
                selectedUpazila ||
                ""
              }
              onValueChange={(
                value,
              ) =>
                setValue(
                  "recipientUpazila",
                  value,
                )
              }
            >
              <SelectTrigger className="w-full h-10 rounded-xl text-xs">
                <SelectValue placeholder="Select Upazila" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {filteredUpazilas.map(
                    (upazila) => (
                      <SelectItem
                        key={
                          upazila.id
                        }
                        value={
                          upazila.name
                        }
                      >
                        {
                          upazila.name
                        }
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Contact Number
            </label>

            <input
              type="tel"
              {...register(
                "contactNumber",
              )}
              className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="+8801XXXXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Hospital Name
            </label>

            <input
              type="text"
              {...register(
                "hospitalName",
              )}
              className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Full Address
            </label>

            <input
              type="text"
              {...register(
                "fullAddress",
              )}
              className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Donation Date
            </label>

            <input
              type="date"
              {...register(
                "donationDate",
              )}
              className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Donation Time
            </label>

            <input
              type="time"
              {...register(
                "donationTime",
              )}
              className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Emergency Note /
              Description
            </label>

            <textarea
              rows={4}
              {...register(
                "description",
              )}
              className="w-full p-3 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
              placeholder="State medical criticalities or custom instructions..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.back()
            }
            disabled={loading}
            className="rounded-xl text-xs font-bold h-10 px-4"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="rounded-xl text-xs font-bold h-10 px-5 bg-red-600 hover:bg-red-700 text-white shadow-sm flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="size-3.5" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}