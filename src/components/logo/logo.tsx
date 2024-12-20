"use client";
import { useTheme } from "next-themes";
import classes from "./Logo.module.scss";
import logoInital from "/public/asset/logo.png";
import LogoWhite from "/public/asset/logo_w.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Logo({ link = false }: { link?: boolean }) {
  const { theme } = useTheme();

  const router = useRouter();
  const [mount, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // mount 되기 전에는 빈 div 반환
  if (!mount) {
    return (
      <div
        className={`${classes.logoWrapper} 
      ${link ? classes.cursor : undefined}`}
      />
    );
  }

  // mount 된 후에는 resolvedTheme 사용
  const transformThemeLogo = theme === "dark" ? LogoWhite : logoInital;

  const handleClick = () => {
    if (link) {
      router.push("/");
    }
  };

  return (
    <div
      className={`${classes.logoWrapper} ${link ? classes.cursor : undefined}`}
      onClick={handleClick}
    >
      <Image
        src={transformThemeLogo}
        alt="logo"
        fill
        priority
        style={{ objectFit: "contain" }}
        sizes="(max-width: 768px) 100vw"
      />
    </div>
  );
}
