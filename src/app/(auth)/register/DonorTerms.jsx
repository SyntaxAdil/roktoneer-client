import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FieldLabel } from "../../../components/ui/field";

export default function DonorTerms() {
  return (
    <div className="flex items-start gap-2">
      <FieldLabel
        htmlFor="terms"
        className="text-xs text-muted-foreground cursor-pointer select-none leading-normal"
      >
        I agree to register as an active donor, acknowledging the{" "}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <span className="text-red-500 hover:underline font-semibold cursor-pointer inline">
              Donor Platform Rules & Privacy Consent
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[460px] rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Donor Registration & Data Policy
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400 text-xs space-y-3 pt-2 text-left">
                <p className="leading-relaxed">
                  By registering as an active life-saving donor on Roktoneer, you explicitly accept and agree to the following system terms:
                </p>
                <ul className="list-disc pl-4 space-y-2 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                  <li>
                    <strong className="text-zinc-900 dark:text-zinc-50">Global Network Visibility:</strong> Your name, blood group, phone number, and location will be shared publicly across our network to connect you with critical emergency blood requests efficiently.
                  </li>
                  <li>
                    <strong className="text-zinc-900 dark:text-zinc-50">Strict Abuse Ban:</strong> Any system misuse, fraudulent activity, harassment, or providing fabricated personal records will result in an immediate, permanent, irreversible account ban and block.
                  </li>
                  <li>
                    <strong className="text-zinc-900 dark:text-zinc-50">Continuous Accuracy:</strong> You commit to updating your availability status honestly after any donation event to keep the data reliable.
                  </li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 flex sm:justify-end gap-2">
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider h-9 px-4">
                I Understand & Agree
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>{" "}
        of Roktoneer.
      </FieldLabel>
    </div>
  );
}