import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-50/70 dark:bg-zinc-950/70 backdrop-blur-md">
      <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-white/40 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl max-w-xs w-full mx-4 overflow-hidden">
        
        {/* Background Subtle Red Glow */}
        <div className="absolute -top-10 -right-10 size-24 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 size-24 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-2xl" />

        {/* Blood Drop & Heartbeat Animation */}
        <div className="relative size-20 flex items-center justify-center">
          
          {/* Waves radiating from the drop (Heartbeat effect) */}
          <div className="absolute inset-0 rounded-full bg-red-500/15 dark:bg-red-500/10 animate-[ping_1.5s_ease-in-out_infinite]" />
          <div className="absolute size-14 rounded-full bg-red-500/20 dark:bg-red-500/15 animate-[ping_2s_ease-in-out_infinite] animation-delay-500" />
          
          {/* Rotating lifeline ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/30 dark:border-red-500/20 animate-[spin_8s_linear_infinite]" />

          {/* Center Blood Drop SVG with Fluid Pulse */}
          <div className="relative animate-[bounce_1.2s_ease-in-out_infinite] flex items-center justify-center">
            <svg
              className="size-10 text-red-500 drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            
            {/* Inner tiny glow dot */}
            <div className="absolute top-5 size-1.5 rounded-full bg-white/60 blur-[0.5px]" />
          </div>
        </div>

        {/* Text UI */}
        <div className="mt-6 text-center space-y-1">
          <h3 className="text-sm font-black tracking-widest uppercase text-zinc-900 dark:text-zinc-50 flex items-center justify-center gap-1">
            ROKTONEER <span className="text-red-500 animate-pulse">❤️</span>
          </h3>
          
          <div className="flex items-center justify-center gap-1.5">
            <p className="text-[11px] font-bold text-red-500/80 dark:text-red-400/80 tracking-wide uppercase">
              Searching Emergency Pipelines
            </p>
            {/* Animated Loading Dots */}
            <span className="flex gap-0.5 mt-0.5">
              <span className="size-1 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]" />
              <span className="size-1 rounded-full bg-red-500 animate-bounce [animation-delay:-0.15s]" />
              <span className="size-1 rounded-full bg-red-500 animate-bounce" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}