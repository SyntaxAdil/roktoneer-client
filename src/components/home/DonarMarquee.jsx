"use client";

import { Marquee } from "../ui/marquee";




export default function DonorMarquee({requests}) {

  const alerts=requests.map(req=> req.bloodGroup +" "+ req.recipientUpazila + " | "+ req.recipientDistrict + " | " +req.contactNumber )
  
  return (
   <>
   {alerts.length>0 &&  <div className="w-full bg-red-500 dark:bg-red-800 h-9 flex items-center overflow-hidden border-b border-red-800 shadow-sm">
      <Marquee pauseOnHover className="[--duration:25s] flex items-center h-full">
        {alerts.map((text, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white mx-8 select-none"
          >
            <span className="text-red-200 text-sm">✱</span>
            <span>{text}</span>
          </div>
        ))}
      </Marquee>
    </div>}</>
  );
}