"use client";

import { motion } from "motion/react";
import { ShieldCheck, Zap, MapPin, BellRing, Clock, Users } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Verified Donors",
    desc: "Every donor on our platform goes through a strict verification process with national ID or medical proofs to ensure absolute safety.",
    isUpcoming: false,
  },
  {
    icon: Zap,
    title: "Lightning Fast Match",
    desc: "Our automated matchmaking engine alerts the nearest compatible donors instantly during critical emergency hours.",
    isUpcoming: false,
  },
  {
    icon: MapPin,
    title: "Location-Based Search",
    desc: "Find donors exactly within your area, city, or sub-district to cut down transit time and get blood when every second counts.",
    isUpcoming: false,
  },
  {
    icon: BellRing,
    title: "Real-time SMS Alerts",
    desc: "Once a request is approved, immediate smart notifications and SMS alerts are dispatched directly to eligible nearby donors.",
    isUpcoming: true,
  },
  {
    icon: Clock,
    title: "Smart Donation History",
    desc: "Track eligibility status automatically. Donors are only visible in active search if they passed the standard 3-month cooling period.",
    isUpcoming: true,
  },
  {
    icon: Users,
    title: "Privacy Protected Chat",
    desc: "Connect securely with blood donors via internal secure communication without exposing your sensitive personal phone numbers.",
    isUpcoming: true,
  },
];

export default function FeatureSection() {
  return (
    <section className="relative w-full py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.04),transparent_40%)]" />

      <div className="container mx-auto px-5">
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full"
          >
            Why Choose RoktoNeer
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl max-w-xl"
          >
            Advanced Features for a Modern{" "}
            <span className="text-red-600">Life-Saving Network</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col items-start p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/20 dark:bg-zinc-950/20 backdrop-blur-sm transition-colors hover:bg-white dark:hover:bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md"
              >
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="size-4.5 stroke-[2.5]" />
                  </div>

                  {feature.isUpcoming && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80 px-2 py-0.5 rounded-md select-none group-hover:bg-red-500/10 group-hover:text-red-600 group-hover:border-red-500/20 transition-colors">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}