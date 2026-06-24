import React from "react";

const Logo = ({isVerticle=false}) => {
  return (
    <div
      className={`flex items-center gap-2 text-xl font-black tracking-tight ${isVerticle && "flex-col"}`}
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z" />
        </svg>
      </div>
      <span className="font-extrabold tracking-tight text-foreground">
        Rokto<span className="text-red-600 dark:text-red-500">Neer</span>
      </span>
    </div>
  );
};

export default Logo;
