"use client";

import { NumberTicker } from "../ui/number-ticker";



const statsData = [
  { value: 45, label: "TOTAL DONORS", suffix: "+" },
  { value: 64, label: "DISTRICTS COVERED", suffix: "" },
  { value: 1200, label: "FUNDING (USD)", suffix: "" },
  { value: 100, label: "FREE FOREVER", suffix: "%" },
];

export default function StatsSection() {
  return (
    <div className="w-full bg-red-700 dark:bg-red-800 py-10 border-b border-red-800/50 shadow-sm">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {statsData.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center gap-1.5 select-none">
            
            {/* Number Counter Layout */}
            <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex items-center justify-center">
              <NumberTicker 
                value={stat.value} 
                className="text-white dark:text-white font-black"
              />
              {stat.suffix && <span>{stat.suffix}</span>}
            </div>

            {/* Label Layout */}
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-100 opacity-90">
              {stat.label}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}