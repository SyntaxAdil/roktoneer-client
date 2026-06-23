"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, className }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link href={href}>
      <a className={className + (active ? "text-sky-500" : "")}>{children}</a>
    </Link>
  );
};

export default NavLink;
