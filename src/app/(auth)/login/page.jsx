"use client";

import { useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import Wrapper from "../../../components/shared/Wrapper";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "../../../lib/auth/auth-client";
import toast from "react-hot-toast";

const LogInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            toast.success("Login Successful");
            reset();
            router.push("/");
          },
          
        },
      );
      if (error) {
        toast.error(error.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google sign in failed!");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Wrapper className="max-w-md w-full bg-card border border-border shadow-xl rounded-2xl p-6 md:p-8">
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
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your RoktoNeer account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* email */}
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

          {/* password */}
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
              })}
            />
            {errors.password && (
              <FieldDescription className="text-destructive text-xs mt-1">
                {errors.password.message}
              </FieldDescription>
            )}
          </Field>

          {/* actions */}
          <div className="flex flex-col gap-4 mt-2 items-center">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-lg font-medium shadow-sm transition-colors"
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="flex items-center my-2 w-full">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-3 text-xs text-muted-foreground bg-card">
                OR
              </span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-11 rounded-lg border border-input bg-background hover:bg-muted text-foreground flex items-center justify-center gap-2 font-medium transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </Button>

            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
              <p>Don&apos;t have an account? </p>
              <Link
                href={"/register"}
                className="text-primary font-semibold hover:underline"
              >
                Register as a Donor
              </Link>
            </div>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};

export default LogInPage;