"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { bdDistricts, bdUpazilas, bloodGroupsInfo } from "@/assets/staticDatas";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import Wrapper from "../../../components/shared/Wrapper";
import { Checkbox } from "../../../components/ui/checkbox";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


// blood groups

const bloodGroups = bloodGroupsInfo.map((i) => i.group);

const LogInPage = () => {
  const [districtId, setDistrictId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router= useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      picture: "",
      bloodGroup: "",
      phoneNumber: "",
      district: "",
      upazila: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("picture", e.target.files);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      let imageUrl = "";

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
        } else {
          console.error("imgBB Upload Failed:", resData);
        }
      }
      const finalData = {
        ...data,
        picture: imageUrl,
      };

      toast.success("Register Successfull");

      console.log("Submitted Data with imgBB URL:", finalData);
    } catch (error) {
      toast.error("Register failed");
      console.error("Submission error:", error);
    } finally {
      reset();
      setImagePreview(null);
      setDistrictId("");
      setIsUploading(false);
      router.push("/")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Wrapper className="max-w-xl w-full bg-card border border-border shadow-xl rounded-2xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-primary/10">
              <svg
                className="w-8 h-8 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">
            RoktoNeer
          </h1>
          <p className="text-muted-foreground text-sm">
            Fill in the details below to register as a donor.
          </p>
        </div>

        <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* first row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full name */}
            <Field>
              <FieldLabel
                htmlFor="fullName"
                className="text-xs font-semibold text-foreground/80 mb-1.5"
              >
                Full Name
              </FieldLabel>
              <Input
                id="fullName"
                type="text"
                placeholder="Adil"
                className="w-full h-10 border-input bg-background focus:border-primary focus:ring-ring/20 rounded-lg transition-colors placeholder:text-muted-foreground/50"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <FieldDescription className="text-destructive text-xs mt-1">
                  {errors.fullName.message}
                </FieldDescription>
              )}
            </Field>
            {/* email*/}
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-xs font-semibold text-foreground/80 mb-1.5"
              >
                Email Address
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="adil@example.com"
                className="w-full h-10 border-input bg-background focus:border-primary focus:ring-ring/20 rounded-lg transition-colors placeholder:text-muted-foreground/50"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <FieldDescription className="text-destructive text-xs mt-1">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>
          </div>

          {/* picture row/ */}
          <Field>
            <FieldLabel
              htmlFor="picture"
              className="text-xs font-semibold text-foreground/80 mb-1.5"
            >
              Profile Picture
            </FieldLabel>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-input rounded-xl p-4 bg-background hover:bg-muted/30 transition-all group relative cursor-pointer min-h-[110px]">
              <input
                id="picture"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                onChange={handleImageChange}
              />

              {imagePreview ? (
                <div className="flex items-center gap-4 w-full">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border shadow-inner shrink-0 bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium text-foreground">
                      Image Selected
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Click or drag to replace
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center gap-1.5 pointer-events-none">
                  <svg
                    className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    Drag and drop or{" "}
                    <span className="text-primary font-semibold">browse</span>
                  </p>
                </div>
              )}
            </div>
            <input
              type="hidden"
              {...register("picture", {
                required: "Profile picture is required",
              })}
            />
            {errors.picture && (
              <FieldDescription className="text-destructive text-xs mt-1">
                {errors.picture.message}
              </FieldDescription>
            )}
          </Field>

          {/* second row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* select blood */}
            <Field>
              <FieldLabel className="text-xs font-semibold text-foreground/80 mb-1.5">
                Blood Group
              </FieldLabel>
              <Select onValueChange={(value) => setValue("bloodGroup", value)}>
                <SelectTrigger className="w-full h-10 border-input bg-background focus:border-primary rounded-lg text-left text-foreground">
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border text-popover-foreground">
                  <SelectGroup>
                    {bloodGroups.map((group, idx) => (
                      <SelectItem key={idx} value={group}>
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
                <FieldDescription className="text-destructive text-xs mt-1">
                  {errors.bloodGroup.message}
                </FieldDescription>
              )}
            </Field>

            {/* Number */}
            <Field>
              <FieldLabel
                htmlFor="phoneNumber"
                className="text-xs font-semibold text-foreground/80 mb-1.5"
              >
                Phone Number
              </FieldLabel>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                className="w-full h-10 border-input bg-background focus:border-primary focus:ring-ring/20 rounded-lg transition-colors placeholder:text-muted-foreground/50"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneNumber && (
                <FieldDescription className="text-destructive text-xs mt-1">
                  {errors.phoneNumber.message}
                </FieldDescription>
              )}
            </Field>
          </div>

          {/* third row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* district */}
            <Field>
              <FieldLabel className="text-xs font-semibold text-foreground/80 mb-1.5">
                District
              </FieldLabel>
              <Select
                onValueChange={(value) => {
                  setDistrictId(value);
                  setValue("district", value);
                  setValue("upazila", "");
                }}
              >
                <SelectTrigger className="w-full h-10 border-input bg-background focus:border-primary rounded-lg text-left text-foreground">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border text-popover-foreground">
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
                {...register("district", { required: "District is required" })}
              />
              {errors.district && (
                <FieldDescription className="text-destructive text-xs mt-1">
                  {errors.district.message}
                </FieldDescription>
              )}
            </Field>

            {/* Upazila/Area */}
            <Field>
              <FieldLabel className="text-xs font-semibold text-foreground/80 mb-1.5">
                Upazila/Area
              </FieldLabel>
              <Select
                disabled={!districtId}
                onValueChange={(value) => setValue("upazila", value)}
              >
                <SelectTrigger className="w-full h-10 border-input bg-background focus:border-primary rounded-lg text-left text-foreground">
                  <SelectValue placeholder="Enter area name" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border text-popover-foreground">
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
                <FieldDescription className="text-destructive text-xs mt-1">
                  {errors.upazila.message}
                </FieldDescription>
              )}
            </Field>
          </div>

          {/* fourt row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-xs font-semibold text-foreground/80 mb-1.5"
              >
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="w-full h-10 border-input bg-background focus:border-primary focus:ring-ring/20 rounded-lg transition-colors placeholder:text-muted-foreground/50"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <FieldDescription className="text-destructive text-xs mt-1">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>
            {/* email*/}
            <Field>
              <FieldLabel
                htmlFor="confirmPassword"
                className="text-xs font-semibold text-foreground/80 mb-1.5"
              >
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                className="w-full h-10 border-input bg-background focus:border-primary focus:ring-ring/20 rounded-lg transition-colors placeholder:text-muted-foreground/50"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <FieldDescription className="text-destructive text-xs mt-1">
                  {errors.confirmPassword.message}
                </FieldDescription>
              )}
            </Field>
          </div>

          {/* fifth row conditional */}
          <div className="mt-1">
            <Field
              orientation="horizontal"
              className="flex items-start gap-2.5"
            >
              <Checkbox
                id="terms"
                name="terms"
                className="mt-0.5 border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                onCheckedChange={(checked) =>
                  setValue("terms", checked === true)
                }
              />
              <FieldLabel
                htmlFor="terms"
                className="text-xs text-muted-foreground cursor-pointer select-none leading-normal"
              >
                I agree to the{" "}
                <span className="text-primary hover:underline font-medium">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-primary hover:underline font-medium">
                  Privacy Policy
                </span>
                .
              </FieldLabel>
            </Field>
            <input
              type="hidden"
              {...register("terms", {
                required: "You must agree to the terms",
              })}
            />
            {errors.terms && (
              <FieldDescription className="text-destructive text-xs mt-1 block">
                {errors.terms.message}
              </FieldDescription>
            )}
          </div>

          {/* actions */}
          <div className="flex flex-col gap-4 mt-3 items-center">
            <Button
              type="submit"
              disabled={isUploading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
            >
              {isUploading ? "Uploading & Processing..." : "Create Account"}
            </Button>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <p>Already have an account? </p>
              <Link
                href={"/login"}
                className="text-primary font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};

export default LogInPage;
