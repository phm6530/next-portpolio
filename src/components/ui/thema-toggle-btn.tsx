"use client";
import { useTheme } from "next-themes";
import LightMode from "/public/asset/icon/mode_light.svg";
import DarkMode from "/public/asset/icon/mode_dark.svg";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const curTheme = theme === "light" ? "dark" : "light";

  return (
    <div
      className={cn(
        `fixed right-10 bottom-10 z-1 cursor-pointer overflow-hidden rounded-md
         flex 
         justify-center
        bg-[hsl(255,255,255)]
         shadow-center
         dark:shadow-center-dark
        dark:bg-[#404345]
        
        `
      )}
      onClick={() => setTheme(curTheme)}
    >
      <div className="[&>svg]:w-6 [&>svg]:h-6 p-2 dark:[&>svg]:fill-slate-50">
        {curTheme === "light" ? <LightMode /> : <DarkMode />}
      </div>
    </div>
  );
}
