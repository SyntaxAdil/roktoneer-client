"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { FaHeartbeat, FaTint } from "react-icons/fa";
import { TypingAnimation } from "../ui/typing-animation";
import { AnimatedList } from "../ui/animated-list";


const notifications = [
  { name: "Emergency Request", group: "O+", location: "Dhaka Medical", time: "Just now", type: "urgent" },
  { name: "Donation Completed", group: "A+", location: "Mirpur", time: "5m ago", type: "success" },
  { name: "Emergency Request", group: "B-", location: "Enam Medical", time: "12m ago", type: "urgent" },
  { name: "Donation Completed", group: "AB+", location: "Square Hosp.", time: "30m ago", type: "success" },
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-background pt-15 pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.06),transparent_50%)]" />

      <div className="container mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left items-start">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-red-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            12,482 Verified Donors Active Now
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.15] min-h-[150px] sm:min-h-[auto]">
            Give Life. <br />
            <span className="text-red-600 dark:text-red-500 inline-block">
              <TypingAnimation
                words={["Connect Donors.", "Save Lives.", "Bridge the Gap."]}
                typeSpeed={60}
                deleteSpeed={40}
                pauseDelay={1800}
                loop
              />
            </span>
            <br />Save the World.
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed"
          >
            The digital bridge between those who need blood and those who can give it. Join Bangladesh&apos;s most efficient life-saving network.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <Link href="/donors" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-md shadow-red-500/10">
                <BiSearchAlt className="text-lg" />
                Find a Donor
              </button>
            </Link>

            <Link href="/register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-foreground font-semibold text-sm px-7 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 active:scale-95 shadow-sm">
                <HiOutlineUserPlus className="text-lg text-red-500" />
                Become a Donor
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Animated Donation List */}
        <div className="lg:col-span-5 relative flex h-[400px] w-full flex-col justify-center overflow-hidden rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-md p-6 shadow-2xl dark:shadow-red-950/10">
          <AnimatedList>
            {notifications.map((item, idx) => (
              <div
                key={idx}
                className="flex w-full items-center gap-4 rounded-2xl bg-white dark:bg-zinc-900 p-4 border border-zinc-100 dark:border-zinc-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
                  item.type === "urgent" 
                    ? "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 animate-pulse" 
                    : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                }`}>
                  {item.type === "urgent" ? <FaTint /> : <FaHeartbeat />}
                </div>
                
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold truncate text-foreground">{item.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    Blood Group: <span className="font-bold text-foreground">{item.group}</span> • {item.location}
                  </p>
                </div>
              </div>
            ))}
          </AnimatedList>
        </div>

      </div>
    </section>
  );
}