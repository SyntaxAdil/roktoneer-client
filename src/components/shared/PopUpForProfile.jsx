"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "../../lib/auth/auth-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AlertCircle, ShieldAlert, ArrowRight } from "lucide-react";

const PopUpForProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!user) return;

    const isProfileIncomplete =
      !user.phoneNumber || !user.upazila || !user.district || !user.bloodGroup;

    if (!isProfileIncomplete) {
      setIsOpen(false);
      return;
    }

    const initialTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    const interval = setInterval(() => {
      setIsOpen(true);
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [user]);

  if (!isMounted || !user) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="sm:max-w-[440px] rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl">
        <AlertDialogHeader className="space-y-3 text-left">
          <div className="size-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 animate-pulse">
            <ShieldAlert className="size-6" />
          </div>

          <div className="space-y-1">
            <AlertDialogTitle className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Complete Your Profile
            </AlertDialogTitle>
            <p className="text-[10px] uppercase tracking-widest font-black text-red-500">
              Action Required
            </p>
          </div>

          <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed pt-1">
            Your blood group, phone number, and location details are missing. Without this critical data, the system cannot match you with emergency blood requests in your region.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40 p-3.5 flex items-start gap-2.5 my-2">
          <AlertCircle className="size-4 text-zinc-400 shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium leading-normal text-zinc-500 dark:text-zinc-400">
            Completing this layout activates your nationwide donor synchronization across the network.
          </p>
        </div>

        <AlertDialogFooter className="flex sm:justify-end gap-2 pt-2">
          <AlertDialogCancel className="rounded-xl text-xs font-bold uppercase tracking-wider h-10 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            Remind Later
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white h-10 px-4 text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
            >
              Update Now
              <ArrowRight className="size-3.5" />
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopUpForProfile;