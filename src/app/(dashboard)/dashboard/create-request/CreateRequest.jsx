"use client";

import React, { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth/auth-client";
import { motion } from "motion/react";
import {
  Loader2,
  PlusCircle,
  User,
  Mail,
  Heart,
  MapPin,
  Building,
  Calendar,
  Clock,
  MessageSquare,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";
import { bdDistricts, bdUpazilas, bloodGroupsInfo } from "@/assets/staticDatas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bloodGroups = bloodGroupsInfo.map((i) => i.group);

export default function CreateRequestPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      requesterName: session?.user?.name || "",
      requesterEmail: session?.user?.email || "",
      bloodGroup: "",
      recipientDistrict: "",
      recipientUpazila: "",
      contactNumber: "",
    },
  });

  const selectedDistrict = watch("recipientDistrict");
  const selectedUpazila = watch("recipientUpazila");
  const selectedBloodGroup = watch("bloodGroup");

  const filteredUpazilas = useMemo(() => {
    return bdUpazilas.filter((u) => u.district_id === String(selectedDistrict));
  }, [selectedDistrict]);

  const onSubmit = async (data) => {
    try {
      const districtData = bdDistricts.find(
        (d) => d.id === data.recipientDistrict,
      );
      const upazilaData = bdUpazilas.find(
        (u) => u.id === data.recipientUpazila,
      );

      const payload = {
        ...data,
        recipientDistrict: districtData?.name || "",
        recipientUpazila: upazilaData?.name || "",
      };

      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Donation request created successfully");
        startTransition(() => {
          router.push("/dashboard/my-requests");
        });
      } else {
        toast.error(result.message || "Failed to create request");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 md:p-8 shadow-sm"
      >
        <div className="mb-8">
          <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            Create Blood Request
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Fill out the form below to post a new blood requirements board
            listing.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="size-3.5" />
                Requester Name
              </label>
              <input
                {...register("requesterName")}
                disabled
                type="text"
                className="w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40 text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="size-3.5" />
                Requester Email
              </label>
              <input
                {...register("requesterEmail")}
                disabled
                type="email"
                className="w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40 text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="size-3.5" />
                Recipient Name
              </label>
              <input
                {...register("recipientName", {
                  required: "Recipient name is required",
                })}
                type="text"
                className="w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 focus:border-red-500 focus:outline-none transition-all"
              />
              {errors.recipientName && (
                <span className="text-[10px] font-bold text-red-500 block">
                  {errors.recipientName.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="size-3.5" />
                Blood Group
              </label>
              <Select
                value={selectedBloodGroup || ""}
                onValueChange={(value) =>
                  setValue("bloodGroup", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full h-11 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
              />
              {errors.bloodGroup && (
                <span className="text-[10px] font-bold text-red-500 block">
                  {errors.bloodGroup.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                Recipient District
              </label>
              <Select
                value={selectedDistrict || ""}
                onValueChange={(value) => {
                  setValue("recipientDistrict", value, {
                    shouldValidate: true,
                  });
                  setValue("recipientUpazila", "");
                }}
              >
                <SelectTrigger className="w-full h-11 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bdDistricts.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("recipientDistrict", {
                  required: "District is required",
                })}
              />
              {errors.recipientDistrict && (
                <span className="text-[10px] font-bold text-red-500 block">
                  {errors.recipientDistrict.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="size-3.5" />
                Recipient Upazila
              </label>
              <Select
                disabled={!selectedDistrict}
                value={selectedUpazila || ""}
                onValueChange={(value) =>
                  setValue("recipientUpazila", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full h-11 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <SelectValue placeholder="Select Upazila" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filteredUpazilas.map((upazila) => (
                      <SelectItem key={upazila.id} value={upazila.id}>
                        {upazila.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("recipientUpazila", {
                  required: "Upazila is required",
                })}
              />
              {errors.recipientUpazila && (
                <span className="text-[10px] font-bold text-red-500 block">
                  {errors.recipientUpazila.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                Donation Date
              </label>
              <input
                {...register("donationDate", {
                  required: "Donation date is required",
                  validate: (value) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const selectedDate = new Date(value);

                    return (
                      selectedDate >= today || "Past dates are not allowed"
                    );
                  },
                })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 focus:border-red-500 focus:outline-none transition-all cursor-pointer"
              />
              {errors.donationDate && (
                <span className="text-[10px] font-bold text-red-500 block">
                  {errors.donationDate.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="size-3.5" />
                Donation Time
              </label>
              <input
                {...register("donationTime", {
                  required: "Donation time is required",
                })}
                type="time"
                className="w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 focus:border-red-500 focus:outline-none transition-all cursor-pointer"
              />
              {errors.donationTime && (
                <span className="text-[10px] font-bold text-red-500 block">
                  {errors.donationTime.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="size-3.5" />
              Contact Number
            </label>
            <input
              {...register("contactNumber", {
                required: "Contact number is required",
                pattern: {
                  value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                  message: "Please enter a valid Bangladeshi phone number",
                },
              })}
              type="tel"
              placeholder="e.g. 017XXXXXXXX"
              className="w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 focus:border-red-500 focus:outline-none transition-all"
            />
            {errors.contactNumber && (
              <span className="text-[10px] font-bold text-red-500 block">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="size-3.5" />
              Hospital Name
            </label>
            <input
              {...register("hospitalName", {
                required: "Hospital name is required",
              })}
              type="text"
              className="w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 focus:border-red-500 focus:outline-none transition-all"
            />
            {errors.hospitalName && (
              <span className="text-[10px] font-bold text-red-500 block">
                {errors.hospitalName.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              Full Address
            </label>
            <input
              {...register("fullAddress", {
                required: "Full address is required",
              })}
              type="text"
              placeholder="e.g. Ward 4, House 12, Mirpur 10"
              className="w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 focus:border-red-500 focus:outline-none transition-all"
            />
            {errors.fullAddress && (
              <span className="text-[10px] font-bold text-red-500 block">
                {errors.fullAddress.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="size-3.5" />
              Request Message
            </label>
            <textarea
              {...register("requestMessage", {
                required: "Request message is required",
              })}
              rows={4}
              placeholder="State why blood is needed or any specific instructions..."
              className="w-full p-4 text-sm font-semibold rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 focus:border-red-500 focus:outline-none transition-all resize-none"
            />
            {errors.requestMessage && (
              <span className="text-[10px] font-bold text-red-500 block">
                {errors.requestMessage.message}
              </span>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-5 h-11 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-500/10 active:scale-98 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <PlusCircle className="size-4" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
