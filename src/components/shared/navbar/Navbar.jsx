"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  LucideLayoutDashboard,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";

import {
  handleSignout,
  useSession,
} from "@/lib/auth/auth-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Logo from "../Logo";


const Navbar = () => {
  const { data: session, refetch } = useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Donation Requests", href: "/donation-requests" },
    ...(user ? [{ label: "Funding", href: "/funding" }] : []),
  ];

  const initials = user?.name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.slice(0, 2)
    ?.toUpperCase();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-xl bg-background/80 border-b"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" >
            <Logo></Logo>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <AnimatedThemeToggler fromCenter />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none">
                    <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-red-400 transition-all">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <LucideLayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleSignout(refetch)}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="rounded-lg">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="rounded-lg bg-red-500 hover:bg-red-600">Start Donating</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border bg-background"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay & Panel */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background md:hidden overflow-y-auto">
          <div className="container flex flex-col gap-2 px-4 py-6 pb-20">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border px-4 py-3 hover:bg-muted"
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              {/* Mobile Toggler Box */}
              <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-2.5">
                <span className="text-sm font-medium text-muted-foreground">Theme Mode</span>
                <AnimatedThemeToggler />
              </div>

              {user ? (
                <>
                  <div className="flex items-center gap-3 rounded-xl border p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{user?.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>

                  <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start rounded-lg">
                      <LucideLayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </Button>
                  </Link>

                  {user?.role === "admin" && (
                    <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start rounded-lg">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="destructive"
                    className="w-full justify-start rounded-lg"
                    onClick={() => {
                      setMenuOpen(false);
                      handleSignout(refetch);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-lg">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full rounded-lg bg-red-500 hover:bg-red-600">Start Donating</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;