"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth/auth-client";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Activity,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/10 dark:text-amber-400">
          <Clock className="size-3.5" /> Pending
        </span>
      );
    case "inprogress":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/10 dark:text-blue-400">
          <Activity className="size-3.5" /> In Progress
        </span>
      );
    case "done":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/10 dark:text-emerald-400">
          <CheckCircle2 className="size-3.5" /> Done
        </span>
      );
    case "canceled":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 border border-rose-500/10 dark:text-rose-400">
          <XCircle className="size-3.5" /> Canceled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-500/10 text-zinc-600 border border-zinc-500/10">
          Unknown
        </span>
      );
  }
};

export default function DonationRequestClient({ request }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirmDonate = async () => {
    if (!session?.user) {
      toast.error("You must be logged in to donate");
      return;
    }

    try {
      const { data: tokenData } = await authClient.token();
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/status/${request._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            donationStatus: "inprogress",
            donorName: session.user.name,
            donorEmail: session.user.email,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Thank you! Status updated to In Progress.");
        setIsOpen(false);
        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6 select-none">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-xl gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-4" /> Back
        </Button>
        {getStatusBadge(request.donationStatus)}
      </div>

      <div className="bg-card border border-border shadow-xl rounded-2xl p-6 md:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-black tracking-tight text-foreground flex items-center gap-2">
              <Heart className="size-5 text-red-500 fill-red-500" /> Blood Request Details
            </h1>
            <p className="text-muted-foreground text-xs mt-1">
              Detailed overview of the generated emergency blood requirement pipeline.
            </p>
          </div>

          {request.donationStatus === "pending" && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl h-10 px-5 transition-all shadow-md shadow-red-500/10 active:scale-98">
                  Donate Blood
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-2xl border border-border bg-card">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-base font-black tracking-tight">
                    <AlertCircle className="size-5 text-red-500" /> Confirm Your Donation
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground pt-1">
                    Are you ready to accept this emergency pipeline? Your public identity token will be visible to the requester.
                  </DialogDescription>
                </DialogHeader>

                <div className="my-4 p-4 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <User className="size-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Donor Name</p>
                      <p className="text-sm font-semibold text-foreground">{session?.user?.name || "Loading..."}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mail className="size-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Donor Email</p>
                      <p className="text-sm font-medium text-foreground break-all">{session?.user?.email || "Loading..."}</p>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex sm:justify-end gap-2 pt-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl text-xs font-bold uppercase tracking-wider h-10"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmDonate}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl h-10 px-5 shadow-sm active:scale-98"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      "Confirm & Connect"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Recipient Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Name</p>
                  <p className="text-sm font-semibold text-foreground">{request.recipientName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="size-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Required Blood Group</p>
                  <p className="text-sm font-black text-red-600 dark:text-red-400">{request.bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Requester Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Name</p>
                  <p className="text-sm font-semibold text-foreground">{request.requesterName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Email Address</p>
                  <p className="text-sm font-medium text-foreground break-all">{request.requesterEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Logistics & Location
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="size-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-[11px] text-muted-foreground">Venue / Region</p>
                <p className="text-sm font-medium text-foreground">
                  {request.recipientUpazila}, {request.recipientDistrict}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Schedule Timeline
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Target Date</p>
                  <p className="text-sm font-semibold text-foreground">{request.donationDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Expected Time</p>
                  <p className="text-sm font-semibold text-foreground">{request.donationTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}