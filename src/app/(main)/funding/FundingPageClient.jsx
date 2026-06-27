"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

import { Heart, Server, Users, ShieldAlert, Activity } from "lucide-react";
import FundByDonors from "../../../components/funds/FundByDonors";

export default function FundingPageClient({ initialUsers, initialTotalFunds }) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      <div className="lg:col-span-5 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col justify-between h-full min-h-[480px]">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="size-5 text-red-500 fill-current" />
            <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Why We Need Funding
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 max-w-xl">
            Roktoneer is a entirely free platform connecting critical blood pipelines across Bangladesh. Your funds maintain server synchronization, immediate SMS routing, and database integrity.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative flex w-full items-center justify-center overflow-hidden py-10 my-4 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-100 dark:border-zinc-800/40"
        >
          <div className="flex size-full flex-row items-stretch justify-between max-w-sm px-4 z-10">
            <div className="flex flex-col justify-center gap-8">
              <div ref={div1Ref} className="flex size-12 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 text-red-500">
                <Users className="size-5" />
              </div>
              <div ref={div2Ref} className="flex size-12 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 text-amber-500">
                <ShieldAlert className="size-5" />
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div ref={div5Ref} className="flex size-16 items-center justify-center rounded-2xl border-2 border-red-500/20 bg-white p-3 shadow-md dark:border-zinc-800 dark:bg-zinc-900 text-red-500 animate-pulse">
                <Heart className="size-8 fill-current" />
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-8">
              <div ref={div3Ref} className="flex size-12 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 text-sky-500">
                <Server className="size-5" />
              </div>
              <div ref={div4Ref} className="flex size-12 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 text-emerald-500">
                <Activity className="size-5" />
              </div>
            </div>
          </div>

          <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div5Ref} color="#ef4444" />
          <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div5Ref} color="#f59e0b" />
          <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div5Ref} color="#0ea5e9" reverse />
          <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div5Ref} color="#10b981" reverse />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] text-zinc-500 dark:text-zinc-400">
          <div>
            <span className="font-bold text-zinc-900 dark:text-zinc-50 block">Operational Ecosystem</span>
            Database operations and instant alerts syncing donor-patient links.
          </div>
          <div>
            <span className="font-bold text-zinc-900 dark:text-zinc-50 block">Emergency Ready</span>
            Ensuring zero down-time for high-volume systemic traffic.
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <FundByDonors initialUsers={initialUsers} initialTotalFunds={initialTotalFunds} />
      </div>
    </div>
  );
}