"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  GitPullRequest,
  PlusCircle,
  Globe,
  Users2,
  LogOut,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../shared/Logo";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { handleSignout, useSession } from "../../lib/auth/auth-client";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { data: session, isPending } = useSession();

  const userClient = session?.user;
  const userRole = userClient?.role?.toLowerCase() || "donor";

  const userInitial = userClient?.name
    ?.trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((w) => w[0]?.toUpperCase())
    ?.join("");

  const menuConfig = [
    {
      group: "Main Menu",
      roles: ["donor", "volunteer", "admin"],
      items: [
        { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { title: "My Profile", icon: User, href: "/dashboard/profile" },
      ],
    },
    {
      group: "Donations",
      roles: ["donor", "volunteer", "admin"],
      items: [
        { title: "My Requests", icon: GitPullRequest, href: "/dashboard/my-requests" },
        { title: "Create Request", icon: PlusCircle, href: "/dashboard/create-request" },
      ],
    },
    {
      group: "Management",
      roles: ["volunteer", "admin"],
      items: [
        { title: "Public Requests", icon: Globe, href: "/dashboard/public-requests" },
      ],
    },
    {
      group: "Administration",
      roles: ["admin"],
      items: [
        { title: "All Users", icon: Users2, href: "/dashboard/all-users" },
      ],
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 transition-all duration-300"
    >
      {/* Sidebar Header */}
      <SidebarHeader
        className={`h-20 flex flex-row items-center justify-between transition-all border-b border-zinc-100 dark:border-zinc-900 ${
          isCollapsed ? "justify-center px-0" : "px-6"
        }`}
      >
        {!isCollapsed ? (
          <>
            <div className="flex items-center shrink-0">
              <Link href={"/"}><Logo /></Link>
            </div>
            <div className="flex items-center justify-center size-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 shadow-sm shrink-0">
              <AnimatedThemeToggler fromCenter />
            </div>
          </>
        ) : (
          <div className="h-9 w-9 rounded-xl bg-red-500/10 flex items-center justify-center font-bold text-red-600 dark:text-red-400 text-sm shadow-sm shrink-0">
            {userInitial || "U"}
          </div>
        )}
      </SidebarHeader>

      {/* Navigation Streams */}
      <SidebarContent className={`mt-4 space-y-5 ${isCollapsed ? "px-2" : "px-4"}`}>
        {menuConfig.map((section) => {
          if (!section.roles.includes(userRole)) return null;

          return (
            <div key={section.group} className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase px-3 block mb-1.5">
                  {section.group}
                </span>
              )}
              <SidebarMenu className="gap-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className={`w-full flex items-center h-10 rounded-xl transition-all duration-200 relative group
                          ${
                            isActive
                              ? "bg-red-600 text-white font-bold shadow-sm shadow-red-500/20 hover:bg-red-600 hover:text-white"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium"
                          } 
                          ${isCollapsed ? "justify-center px-0 h-10 w-10 mx-auto" : "px-3 gap-3"}`}
                      >
                        <Link href={item.href} className="w-full h-full flex items-center">
                          <item.icon
                            className={`h-[18px] w-[18px] shrink-0 transition-colors
                              ${isActive ? "text-white" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-50"}`}
                          />
                          {!isCollapsed && (
                            <span className="text-xs tracking-wide">{item.title}</span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </div>
          );
        })}
      </SidebarContent>

      {/* Bottom Footer View */}
      <SidebarFooter className={`p-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/40 dark:bg-zinc-950/40 ${isCollapsed ? "items-center px-1" : "space-y-3"}`}>
        {isPending ? (
          <div className="flex items-center justify-center py-2">
            <Loader2 className="animate-spin h-4 w-4 text-zinc-400" />
          </div>
        ) : (
          <>
            {!isCollapsed && (
              <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shrink-0 bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={userClient?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden flex-1">
                  <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 truncate leading-tight">
                    {userClient?.name || "User Name"}
                  </h3>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block truncate font-medium mt-0.5">
                    {userClient?.email || "user@gmail.com"}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => handleSignout()}
              className={`w-full flex items-center justify-center font-bold text-xs tracking-wide bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/40 dark:border-red-900/20 hover:bg-red-100/70 dark:hover:bg-red-950/40 rounded-xl transition-all active:scale-98
                ${isCollapsed ? "h-10 w-10 p-0" : "h-10 gap-2 px-4"}`}
            >
              <LogOut className="size-4 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}