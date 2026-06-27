"use client";

import React, { useEffect } from "react";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Roktoneer Pipeline Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/50 p-4">
      <div className="relative max-w-md w-full rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-md text-center flex flex-col items-center justify-center overflow-hidden">
        
        {/* Decorative Subtle Background Glow */}
        <div className="absolute -top-12 -left-12 size-32 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-2xl" />

        {/* Warning Icon Container */}
        <div className="size-16 bg-amber-50 dark:bg-amber-950/30 rounded-2xl flex items-center justify-center mb-6 border border-amber-100 dark:border-amber-900/30 text-amber-500 dark:text-amber-400">
          <AlertTriangle className="size-8 animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Pipeline Connection Broken
        </h2>

        {/* Dynamic Error Message Block */}
        <div className="mt-3 p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/40 dark:border-zinc-700/30 w-full">
          <p className="text-zinc-600 dark:text-zinc-400 text-xs font-mono break-words line-clamp-2">
            {error?.message || "Something went wrong while processing the donation pipeline data."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Try Again Button */}
          <button
            onClick={() => reset()}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all duration-200"
          >
            <RefreshCw className="size-4" />
            Try Again
          </button>

          {/* Go Home Button */}
          <Link
            href="/"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95 text-zinc-700 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200"
          >
            <Home className="size-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}