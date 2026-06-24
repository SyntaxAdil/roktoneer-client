"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { 
  FaHeart, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaMapMarkerAlt, 
  FaRegEnvelope 
} from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/60 dark:border-zinc-900 transition-colors pt-16 pb-8 ">
      <div className="container mx-auto px-5 lg:px-8 ">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" >
              <Logo></Logo>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Saving lives, one drop at a time. Connecting blood donors with those in need seamlessly across the country.
            </p>
            
            {/* Contact Quick Info */}
            <div className="flex flex-col gap-2.5 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-red-500 text-sm shrink-0" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaRegEnvelope className="text-red-500 text-sm shrink-0" />
                <span>support@roktoneer.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
         
              <li>
                <Link href="/donors" className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  Find Donors
                </Link>
              </li>
              <li>
                <Link href="/requests" className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  Donor Request
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Subscription Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Stay Updated</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Subscribe to get emergency blood donation requests and updates from RoktoNeer.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2 bg-background dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-full pl-3 shadow-inner">
              <Input 
                type="email" 
                placeholder="Enter email" 
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-xs p-0 placeholder:text-muted-foreground/50 w-full"
              />
              <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-600/90 text-white dark:bg-red-500 dark:hover:bg-red-500/90 h-8 rounded-full px-4 text-xs font-semibold shadow-sm">
                Subscribe
              </Button>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/60 my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} RoktoNeer. Saving lives, one drop at a time.</p>
          
          {/* Social Icons & Heart Animation */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5 text-base"><FaFacebookF /></Link>
              <Link href="#" className="hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5 text-base"><FaTwitter /></Link>
              <Link href="#" className="hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5 text-base"><FaInstagram /></Link>
              <Link href="#" className="hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5 text-base"><FaLinkedinIn /></Link>
            </div>
            
            <div className="hidden sm:block h-3 w-px bg-zinc-300 dark:bg-zinc-800" />
            
            <div className="flex items-center gap-1.5">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="inline-flex items-center justify-center"
              >
                <FaHeart className="text-red-500 text-xs" />
              </motion.div>
              <span>in Bangladesh</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;