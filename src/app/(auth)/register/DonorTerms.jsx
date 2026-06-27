import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FieldLabel } from "../../../components/ui/field";
import { Info } from "lucide-react";

export default function DonorTerms() {
  return (
    <div className="w-full">
      <FieldLabel
        htmlFor="terms"
        className="text-xs text-muted-foreground leading-relaxed flex flex-wrap items-center gap-x-1"
      >
        <span>
          I agree to share my donation data globally for emergency requests and understand that any platform misuse will lead to an immediate
        </span>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="font-bold text-red-500 hover:underline inline-flex items-center"
            >
              <Info size={16} className="mr-1" ></Info> Account Block & Ban
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="sm:max-w-lg rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0 overflow-hidden">
            <div className="p-6 space-y-5">
              <AlertDialogHeader className="space-y-2 text-left">
                <AlertDialogTitle className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  Donor Registration & Data Policy
                </AlertDialogTitle>

                <AlertDialogDescription asChild>
                  <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <p>
                      By registering as an active life-saving donor on
                      RoktoNeer, you agree to the following platform policies
                      and responsibilities.
                    </p>

                    <div className="space-y-3">
                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                          Global Network Visibility
                        </h4>
                        <p className="text-xs leading-relaxed">
                          Your name, blood group, phone number, and location may
                          be visible across the donor network to help connect
                          emergency blood requests quickly.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                          Strict Abuse Ban
                        </h4>
                        <p className="text-xs leading-relaxed">
                          Fraud, harassment, fake information, or platform
                          misuse can result in a permanent account suspension.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                          Availability Accuracy
                        </h4>
                        <p className="text-xs leading-relaxed">
                          You agree to keep your donor availability updated after
                          every donation activity.
                        </p>
                      </div>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogAction className="w-full h-11 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold tracking-wide">
                  I Understand & Agree
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <span>under the conditions of RoktoNeer.</span>
      </FieldLabel>
    </div>
  );
}