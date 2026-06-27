import React from "react";
import Link from "next/link";
import { HeartCrack, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="max-w-md w-full rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/80 p-8 shadow-xl backdrop-blur-md text-center flex flex-col items-center justify-center">
        
        {/* Animated Icon Container */}
        <div className="size-20 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center mb-6 border border-red-100 dark:border-red-900/30 animate-pulse">
          <HeartCrack className="size-10 text-red-500 dark:text-red-400" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-black tracking-tighter text-red-500 dark:text-red-400">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 max-w-xs leading-relaxed">
          The pipeline or requests page you are looking for doesn&apos;t exist, has been moved, or the blood donation campaign has expired.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all duration-200"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}