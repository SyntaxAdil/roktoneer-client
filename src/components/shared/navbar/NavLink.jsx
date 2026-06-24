"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const NavLink = ({ href, children, className }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 outline-none select-none rounded-full block text-center",
        isActive 
          ? "text-red-600 dark:text-red-400 font-semibold" 
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {isActive && (
        <motion.span
          layoutId="activeNavIndicator"
          className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-zinc-200/50 dark:border-zinc-700/50 -z-10 rounded-full"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}
      
      
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export default NavLink;