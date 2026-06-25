"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import DonationReqCard from "../../../components/donor/DonationReqCard";
import NoReq from "../../../components/donor/NoReq";


const mockRequests = [
  { id: "req-1", recipientName: "Anisur Rahman", location: "Mirpur, Dhaka", bloodGroup: "O-", date: "2026-06-28", time: "10:30 AM" },
  { id: "req-2", recipientName: "Tahmina Akter", location: "Dhanmondi, Dhaka", bloodGroup: "A+", date: "2026-06-26", time: "02:00 PM" },
  { id: "req-3", recipientName: "Sabbir Hossain", location: "Uttara, Dhaka", bloodGroup: "B-", date: "2026-06-30", time: "09:00 AM" },
  { id: "req-4", recipientName: "Fatima Zuhra", location: "Gulshan, Dhaka", bloodGroup: "AB+", date: "2026-07-02", time: "04:30 PM" }
];

export default function DonationRequestPage({ initialRequests = mockRequests }) {
  const [requests] = useState(initialRequests);

  return (
    <section className="w-full py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container max-w-7xl">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full"
          >
            Emergency Board
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Active Blood <span className="text-red-600">Requests</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400"
          >
            Review immediate requirements. Your single decision can alter someone&apos;s timeline completely.
          </motion.p>
        </div>

        {/* Dynamic Responsive 3/4 Column Grid View */}
        {requests.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
          >
            {requests.map((req) => (
              <DonationReqCard key={req.id} req={req} />
            ))}
          </motion.div>
        ) : (
          <NoReq />
        )}

      </div>
    </section>
  );
}