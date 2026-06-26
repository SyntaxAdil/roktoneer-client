import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { headers } from "next/headers";
import { auth } from "../../lib/auth/auth";
import { ShieldCheck, User, HeartHandshake } from "lucide-react";

const DashboardHeader = async ({title="Dashboard"}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const userRole = session?.user?.role?.toLowerCase() || "donor";
  const userName = session?.user?.name?.split(" ")[0] || "User";

  // Role-based Meta config
  const roleMeta = {
    admin: { label: "Admin", icon: ShieldCheck, styles: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
    volunteer: { label: "Volunteer", icon: HeartHandshake, styles: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
    donor: { label: "Donor", icon: User, styles: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  };

  const currentRole = roleMeta[userRole] || roleMeta.donor;
  const RoleIcon = currentRole.icon;

  return (
    <header className="h-20 px-6 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300 w-full">
      <div className="flex items-center gap-4 min-w-0">
        <SidebarTrigger className="h-9 w-9 border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl transition-all shadow-sm" />
        
        <div className="flex flex-col min-w-0">
          <h1 className="font-black text-lg tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
            {title}
          </h1>
          <p className="font-medium text-xs text-zinc-400 dark:text-zinc-500 mt-1 truncate">
            Welcome back, <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{userName}</span>
          </p>
        </div>
      </div>

      {/* Role Badge control */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-[11px] tracking-wide uppercase shadow-[0_2px_8px_rgba(0,0,0,0.01)] select-none shrink-0 ${currentRole.styles}`}>
        <RoleIcon className="size-3.5 stroke-[2.5]" />
        <span>{currentRole.label}</span>
      </div>
    </header>
  );
};

export default DashboardHeader;