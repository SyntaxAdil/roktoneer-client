import React from "react";
import FundingPageClient from "./FundingPageClient";

export const metadata = {
  title: "Funding & Donations | Roktoneer",
  description: "Support the operational servers and pipelines fueling real-time medical blood networking.",
};

async function getFundingData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  try {
    const [usersRes, totalRes] = await Promise.all([
      fetch(`${baseUrl}/api/funds/users`, { cache: "no-store" }).then((res) => res.json()),
      fetch(`${baseUrl}/api/funds/total-funds`, { cache: "no-store" }).then((res) => res.json())
    ]);

    return {
      initialUsers: usersRes?.success ? usersRes?.users : [],
      initialTotalFunds: totalRes?.success ? totalRes?.totalFunds : 0
    };
  } catch (err) {
    console.error(err);
    return {
      initialUsers: [],
      initialTotalFunds: 0
    };
  }
}

export default async function FundingPage() {
  const { initialUsers, initialTotalFunds } = await getFundingData();

  return (
    <main className="min-h-screen w-full bg-zinc-50/50 dark:bg-zinc-950/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
            Platform Security
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Platform <span className="text-red-600">Funding</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Contribute transparently to secure continuous hosting infrastructures.
          </p>
        </div>
        
        <FundingPageClient 
          initialUsers={initialUsers} 
          initialTotalFunds={initialTotalFunds} 
        />
      </div>
    </main>
  );
}