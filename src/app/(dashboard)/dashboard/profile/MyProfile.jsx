
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { useSession, authClient } from "../../../../lib/auth/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Heart,
  MapPin,
  Building,
  Edit3,
  X,
  Check,
  Loader2,
  Upload,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import { bdDistricts, bdUpazilas, bloodGroupsInfo } from "@/assets/staticDatas";

const bloodGroups = bloodGroupsInfo.map((i) => i.group);

export default function MyProfile() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [districtId, setDistrictId] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const user = session?.user;

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    values: {
      name: user?.name || "",
      picture: "",
      phoneNumber: user?.phoneNumber || "",
      bloodGroup: user?.bloodGroup || "",
      district: user?.district || "",
      upazila: user?.upazila || "",
    },
  });

  const selectedBloodGroup = watch("bloodGroup");
  const selectedDistrict = watch("district");
  const selectedUpazila = watch("upazila");

  useEffect(() => {
    if (user?.image) {
      setImagePreview(user.image);
    }
  }, [user]);

  useEffect(() => {
    if (user?.district) {
      const district = bdDistricts.find(
        (d) => d.name === user.district,
      );

      if (district) {
        setDistrictId(String(district.id));
      }
    }
  }, [user]);

  useEffect(() => {
    const district = bdDistricts.find((d) => d.name === selectedDistrict);

    if (district) {
      setDistrictId(String(district.id));
    }
  }, [selectedDistrict]);

  if (isPending) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-red-500" />
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("picture", e.target.files);
    }
  };

  const onSubmit = async (data) => {
    try {
      setServerError("");
      setIsSubmitting(true);

      let imageUrl = user?.image || "";

      if (data.picture && data.picture[0]) {
        const formData = new FormData();
        formData.append("image", data.picture[0]);

        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API;

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const resData = await response.json();

        if (resData.success) {
          imageUrl = resData.data.url;
        }
      }

      const selectedUpazilaData = bdUpazilas.find(
        (u) => String(u.id) === String(data.upazila),
      );

      const { error } = await authClient.updateUser(
        {
          name: data.name,
          image: imageUrl,
          phoneNumber: data.phoneNumber,
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: selectedUpazilaData?.name || "",
        },
        {
          onSuccess: () => {
            toast.success("Profile Updated Successfully!");
            setIsEditing(false);
            setIsSubmitting(false);
            router.refresh();
          },
          onError: (ctx) => {
            setIsSubmitting(false);
            setServerError(ctx?.error?.message || "Something went wrong.");
          },
        },
      );

      if (error) {
        setIsSubmitting(false);
        setServerError(error.message || "Something went wrong.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setServerError("Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 shadow-sm"
      >
        <div className="h-36 bg-gradient-to-r from-red-600 via-red-500 to-rose-500" />

        <div className="px-6 md:px-8 pb-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <div className="relative size-32 rounded-3xl overflow-hidden border-[5px] border-white dark:border-zinc-900 shadow-xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <Image
                  src={
                    imagePreview ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"
                  }
                  alt="Profile"
                  fill
                  className="object-cover"
                />

                {isEditing && (
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-all">
                    <div className="flex flex-col items-center gap-1 text-white">
                      <Upload className="size-5" />
                      <span className="text-[10px] font-semibold">Upload</span>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <div className="pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                    {user?.name}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                    {user?.role || "Donor"}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isEditing) reset();

                setIsEditing(!isEditing);
                setServerError("");
              }}
              className={`h-11 px-5 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                isEditing
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {isEditing ? (
                <>
                  <X className="size-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit3 className="size-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <User className="size-4" />
                  Full Name
                </label>

                <input
                  {...register("name")}
                  disabled={!isEditing}
                  type="text"
                  className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-red-500 transition-all disabled:opacity-70"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <Mail className="size-4" />
                  Email Address
                </label>

                <input
                  disabled
                  value={user?.email || ""}
                  type="email"
                  className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 px-4 text-sm font-medium text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <Phone className="size-4" />
                  Phone Number
                </label>

                <input
                  {...register("phoneNumber")}
                  disabled={!isEditing}
                  type="text"
                  className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-red-500 transition-all disabled:opacity-70"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <Heart className="size-4" />
                  Blood Group
                </label>

                <Select
                  disabled={!isEditing}
                  value={selectedBloodGroup || ""}
                  onValueChange={(value) => setValue("bloodGroup", value)}
                >
                  <SelectTrigger className="w-full h-12 rounded-2xl">
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {bloodGroups.map((group, idx) => (
                        <SelectItem key={idx} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <MapPin className="size-4" />
                  District
                </label>

                <Select
                  disabled={!isEditing}
                  value={
                    bdDistricts.find((d) => d.name === selectedDistrict)?.id ||
                    ""
                  }
                  onValueChange={(value) => {
                    const district = bdDistricts.find((d) => d.id === value);

                    setDistrictId(value);

                    setValue("district", district?.name || "");

                    setValue("upazila", "");
                  }}
                >
                  <SelectTrigger className="w-full h-12 rounded-2xl">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {bdDistricts.map((d) => (
                        <SelectItem key={d.id} value={String(d.id)}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <Building className="size-4" />
                  Upazila
                </label>

                <Select
                  disabled={!isEditing || !districtId}
                  value={selectedUpazila || ""}
                  onValueChange={(value) => {
                    setValue("upazila", value);
                  }}
                >
                  <SelectTrigger className="w-full h-12 rounded-2xl">
                    <SelectValue placeholder="Select Upazila" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {bdUpazilas
                        .filter(
                          (u) =>
                            String(u.district_id) === String(districtId),
                        )
                        .map((u) => (
                          <SelectItem key={u.id} value={String(u.id)}>
                            {u.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <AnimatePresence>
              {serverError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 text-sm font-medium text-red-500"
                >
                  {serverError}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex justify-end mt-8"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="size-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
