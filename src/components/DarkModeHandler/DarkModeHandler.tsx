"use client";
import { useTheme } from "next-themes";
import classes from "./DarkModeHandler.module.scss";
import LightMode from "/public/asset/icon/mode_light.svg";
import DarkMode from "/public/asset/icon/mode_dark.svg";
import { useEffect, useState } from "react";

export default function DarkmodeHandler() {
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
    <div className={classes.darkmode} onClick={() => setTheme(curTheme)}>
      {curTheme === "light" ? <LightMode /> : <DarkMode />}
    </div>
  );
}
