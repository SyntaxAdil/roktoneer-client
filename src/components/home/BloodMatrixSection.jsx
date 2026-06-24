"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger  } from "../ui/dialog";
import { AnimatedBeam } from "../ui/animated-beam";


import React, { forwardRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Heart, Info, Check, X } from "lucide-react";

const BLOOD_GROUPS = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

const COMPATIBILITY_MATRIX = {
  "O-":  { give: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], receive: ["O-"] },
  "O+":  { give: ["O+", "A+", "B+", "AB+"],                         receive: ["O-", "O+"] },
  "A-":  { give: ["A-", "A+", "AB-", "AB+"],                         receive: ["O-", "A-"] },
  "A+":  { give: ["A+", "AB+"],                                     receive: ["O-", "O+", "A-", "A+"] },
  "B-":  { give: ["B-", "B+", "AB-", "AB+"],                         receive: ["O-", "B-"] },
  "B+":  { give: ["B+", "AB+"],                                     receive: ["O-", "O+", "B-", "B+"] },
  "AB-": { give: ["AB-", "AB+"],                                     receive: ["O-", "A-", "B-", "AB-"] },
  "AB+": { give: ["AB+"],                                           receive: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] },
};

const Circle = forwardRef(({ className, children, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        "z-20 flex size-12 cursor-pointer items-center justify-center rounded-full border bg-white font-black text-xs shadow-sm transition-all hover:scale-115 active:scale-95 select-none",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function BloodMatrixSection() {
  const containerRef = useRef(null);
  const donorRefs = useRef({});
  const receiverRefs = useRef({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="w-full pt-0 pb-20 bg-background flex flex-col items-center justify-center gap-12">
      <div className="text-center max-w-2xl px-5 flex flex-col items-center gap-3">
        <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Complete Compatibility <span className="text-red-600">Matrix</span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg">
          Click any blood type to explore its full matching matrix. Universal pathways are actively animated below.
        </p>
      </div>

      <div
        className="relative flex h-[620px] w-full max-w-2xl items-center justify-center overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-50/40 dark:border-zinc-800/80 dark:bg-zinc-900/20 p-6 sm:p-10 shadow-sm"
        ref={containerRef}
      >
        <div className="flex size-full flex-row items-center justify-between z-20 relative">
          
          <div className="flex flex-col justify-between h-full items-center py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-4">Donors</span>
            <div className="flex flex-col gap-3">
              {BLOOD_GROUPS.map((group) => (
                <Dialog key={`donor-${group}`}>
                  <DialogTrigger asChild>
                    <Circle
                      ref={(el) => (donorRefs.current[group] = el)}
                      onClick={() => setSelectedGroup(group)}
                      className={cn(
                        group === "O-" 
                          ? "border-red-500 bg-red-50 text-red-600 ring-4 ring-red-500/10 size-14 text-sm dark:bg-red-950/30" 
                          : "border-zinc-200 dark:border-zinc-800 text-foreground dark:bg-zinc-900"
                      )}
                    >
                      {group}
                    </Circle>
                  </DialogTrigger>
                  <BloodDialogContent group={selectedGroup} />
                </Dialog>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center gap-4 text-center max-w-[160px] bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
            <div className="p-2.5 bg-red-50 dark:bg-red-950/40 rounded-xl text-red-500">
              <Heart className="size-5 fill-current" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-foreground">Interactive Grid</p>
              <p className="text-[11px] text-muted-foreground leading-normal">
                Click any node to see who they can give to or receive from.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full items-center py-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-4">Receivers</span>
            <div className="flex flex-col gap-3">
              {BLOOD_GROUPS.map((group) => (
                <Dialog key={`rec-${group}`}>
                  <DialogTrigger asChild>
                    <Circle
                      ref={(el) => (receiverRefs.current[group] = el)}
                      onClick={() => setSelectedGroup(group)}
                      className={cn(
                        group === "AB+" 
                          ? "border-red-500 bg-red-50 text-red-600 ring-4 ring-red-500/10 size-14 text-sm dark:bg-red-950/30" 
                          : "border-zinc-200 dark:border-zinc-800 text-foreground dark:bg-zinc-900"
                      )}
                    >
                      {group}
                    </Circle>
                  </DialogTrigger>
                  <BloodDialogContent group={selectedGroup} />
                </Dialog>
              ))}
            </div>
          </div>

        </div>

        {isMounted && (
          <>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={{ current: donorRefs.current["O-"] }}
              toRef={{ current: receiverRefs.current["AB+"] }}
              curvature={0}
              gradientStartColor="#ef4444"
              gradientStopColor="#dc2626"
              duration={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={{ current: donorRefs.current["O-"] }}
              toRef={{ current: receiverRefs.current["O-"] }}
              curvature={-80}
              gradientStartColor="#ef4444"
              gradientStopColor="#f97316"
              duration={3.5}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={{ current: donorRefs.current["O-"] }}
              toRef={{ current: receiverRefs.current["B+"] }}
              curvature={40}
              gradientStartColor="#ef4444"
              gradientStopColor="#ec4899"
              duration={4}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={{ current: donorRefs.current["A-"] }}
              toRef={{ current: receiverRefs.current["AB+"] }}
              curvature={-30}
              gradientStartColor="#9333ea"
              gradientStopColor="#ef4444"
              duration={4.5}
              reverse
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={{ current: donorRefs.current["B+"] }}
              toRef={{ current: receiverRefs.current["AB+"] }}
              curvature={50}
              gradientStartColor="#2563eb"
              gradientStopColor="#ef4444"
              duration={3.8}
              reverse
            />
          </>
        )}
      </div>
    </section>
  );
}

function BloodDialogContent({ group }) {
  if (!group) return null;
  const info = COMPATIBILITY_MATRIX[group];

  return (
    <DialogContent className="sm:max-w-md rounded-2xl p-6">
      <DialogHeader className="flex flex-row items-center gap-3 space-y-0 border-b pb-4 border-zinc-100 dark:border-zinc-800">
        <div className="h-11 w-11 rounded-xl bg-red-500/10 text-red-600 font-black text-base flex items-center justify-center border border-red-500/10 shadow-sm shrink-0">
          {group}
        </div>
        <div className="flex flex-col">
          <DialogTitle className="text-base font-bold text-foreground">
            Type {group} Compatibility
          </DialogTitle>
          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Info className="size-3" /> Medical Transfusion Rules
          </span>
        </div>
      </DialogHeader>

      <div className="flex flex-col gap-5 mt-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Can Give Blood To</h4>
          <div className="flex flex-wrap gap-1.5">
            {BLOOD_GROUPS.map((g) => {
              const isCompatible = info.give.includes(g);
              return (
                <span
                  key={`give-${g}`}
                  className={cn(
                    "inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-bold border transition-colors",
                    isCompatible
                      ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/10 dark:bg-emerald-500/10"
                      : "bg-zinc-50 text-zinc-400 border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800/80 dark:text-zinc-600"
                  )}
                >
                  {isCompatible ? <Check className="size-3 shrink-0 stroke-[3]" /> : <X className="size-3 shrink-0" />}
                  {g}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Can Receive Blood From</h4>
          <div className="flex flex-wrap gap-1.5">
            {BLOOD_GROUPS.map((g) => {
              const isCompatible = info.receive.includes(g);
              return (
                <span
                  key={`receive-${g}`}
                  className={cn(
                    "inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-bold border transition-colors",
                    isCompatible
                      ? "bg-blue-500/5 text-blue-600 border-blue-500/10 dark:bg-blue-500/10"
                      : "bg-zinc-50 text-zinc-400 border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800/80 dark:text-zinc-600"
                  )}
                >
                  {isCompatible ? <Check className="size-3 shrink-0 stroke-[3]" /> : <X className="size-3 shrink-0" />}
                  {g}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}