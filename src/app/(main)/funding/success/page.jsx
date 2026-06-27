"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Activity,
  Heart,
} from "lucide-react";
import { Confetti } from "@/components/ui/confetti";
import { useSession } from "../../../../lib/auth/auth-client";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const { data: session } = useSession();

  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");

  useEffect(() => {
    const updateFund = async () => {
      try {
        if (!session?.user?.email || !amount) return;

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/funds/add`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: session.user.email,
            amount: Number(amount),
          }),
        });
      } catch (err) {
        console.log(err);
      }
    };

    updateFund();
  }, [session, amount]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-center px-4 py-16">
      <Confetti
        className="absolute inset-0 z-0 size-full"
        options={{
          particleCount: 200,
          spread: 140,
          startVelocity: 40,
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-emerald-500/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full container px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-red-200/60 dark:border-red-900/40 bg-red-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-red-500 w-fit"
          >
            <Heart className="size-3.5 fill-current" />
            Donation Confirmed
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl font-black tracking-tight leading-none text-zinc-900 dark:text-zinc-50"
            >
              Funding
              <span className="block text-red-600 mt-1">Successful</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed"
            >
              Your contribution has been successfully processed and securely
              added to Roktoneer&apos;s emergency blood networking ecosystem
              across Bangladesh.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {[
              {
                icon: HeartHandshake,
                title: "Blood Network",
                desc: "Helping maintain real-time emergency donor pipelines.",
                color: "text-red-500",
                bg: "bg-red-500/10",
              },
              {
                icon: ShieldCheck,
                title: "Secure System",
                desc: "Ensuring uninterrupted encrypted medical communications.",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
              },
              {
                icon: Activity,
                title: "Always Online",
                desc: "Keeping high availability infrastructure active 24/7.",
                color: "text-sky-500",
                bg: "bg-sky-500/10",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 p-4 shadow-sm group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div
                  className={`size-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}
                >
                  <card.icon className={`size-5 ${card.color}`} />
                </div>
                <h3 className="text-xs font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
                  {card.title}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href="/funding"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 hover:bg-red-600 transition-colors text-white h-12 px-6 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              Back To Funding
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors text-zinc-900 dark:text-zinc-50 h-12 px-6 text-xs font-bold uppercase tracking-wider"
            >
              Return Home
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-emerald-500/5 blur-2xl rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-8 shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800/60">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400">
                  Transaction Status
                </p>
                <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">
                  Payment Completed
                </h2>
              </div>
              <div className="size-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-8 text-emerald-500" />
              </div>
            </div>

            <div className="space-y-4 py-6">
              {[
                {
                  label: "Network Security",
                  val: "Protected",
                  color: "text-emerald-500",
                },
                {
                  label: "Infrastructure Status",
                  val: "Operational",
                  color: "text-sky-500",
                },
                {
                  label: "Emergency Routing",
                  val: "Active",
                  color: "text-red-500",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-zinc-100/50 dark:border-zinc-800/30 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {item.label}
                  </span>
                  <span
                    className={`text-xs font-black uppercase tracking-wider ${item.color}`}
                  >
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40 p-4">
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 opacity-90">
                Your contribution directly strengthens critical blood request
                delivery, emergency donor discovery, and continuous nationwide
                medical coordination.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
