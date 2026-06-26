"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, Inbox } from "lucide-react";

export default function NoDonationRequest() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10 min-h-[350px]">
      <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-400 dark:text-zinc-500 border border-zinc-200/40 dark:border-zinc-800 mb-4">
        <Inbox className="size-8 stroke-[1.5]" />
      </div>
      <div className="max-w-xs space-y-1 mb-6">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
          No Requests Found
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          You haven&apos;t created any blood donation requests yet.
        </p>
      </div>
      <Link
        href="/dashboard/create-request"
        className="inline-flex items-center gap-2 px-4 h-10 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-500/10 active:scale-98"
      >
        <PlusCircle className="size-4" />
        Create Request
      </Link>
    </div>
  );
}