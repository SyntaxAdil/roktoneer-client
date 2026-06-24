"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Marquee } from "../ui/marquee";

const mockDonors = [
  {
    name: "Ahmed Zubair",
    location: "Dhanmondi, Dhaka",
    group: "O+",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Nusrat Jahan",
    location: "Uttara, Dhaka",
    group: "A-",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Kabir Hossain",
    location: "Mirpur, Dhaka",
    group: "B+",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Sarah Karim",
    location: "Banani, Dhaka",
    group: "AB-",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Asif Rahman",
    location: "Gulshan, Dhaka",
    group: "O-",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Sultana Kamal",
    location: "Wari, Dhaka",
    group: "B-",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
  },
];

const DonorCard = ({ donor }) => (
  <div className="flex items-center gap-4 w-72 p-4 rounded-xl border border-zinc-200/60 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:border-zinc-800/60 dark:bg-zinc-900 select-none shrink-0 transition-transform hover:scale-[1.02]">
    <Image
      width={44}
      height={44}
      src={donor.img}
      alt={donor.name}
      className="h-11 w-11 rounded-full object-cover border border-zinc-100 dark:border-zinc-800"
    />
    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
      <h4 className="text-sm font-bold text-foreground truncate">
        {donor.name}
      </h4>
      <div className="flex items-center gap-1 text-muted-foreground truncate">
        <MapPin className="size-3 text-red-500 shrink-0" />
        <span className="text-[11px] truncate">{donor.location}</span>
      </div>
    </div>
    <div className="h-9 w-9 shrink-0 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-black text-xs flex items-center justify-center border border-red-500/20 shadow-sm">
      {donor.group}
    </div>
  </div>
);

export default function FindDonorSection() {
  return (
    <section className="w-full pt-0 pb-24 bg-background overflow-hidden relative flex flex-col gap-16 items-center justify-center">
      <div className="container mx-auto px-5 max-w-2xl text-center flex flex-col items-center gap-3 z-20">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
          Live Database
        </span>
        <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Find Blood Donors{" "}
          <span className="text-red-600">Near You Instantly</span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg leading-normal">
          Access Bangladesh&apos;s most active network of real-time blood
          donors. Explore our active community database to find immediate
          support.
        </p>

        <div className="mt-4">
          <Link href="/donors" passHrefLegacy>
            <button className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 select-none group">
              Explore Active Donors
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full relative flex flex-col gap-4 justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:120s]">
          {mockDonors.map((donor, idx) => (
            <DonorCard key={`row1-${idx}`} donor={donor} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:125s]">
          {[...mockDonors].reverse().map((donor, idx) => (
            <DonorCard key={`row2-${idx}`} donor={donor} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/20 to-transparent z-10" />
      </div>
    </section>
  );
}
