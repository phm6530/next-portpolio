"use client";
import { useTheme } from "next-themes";
import classes from "./Logo.module.scss";
import logoInital from "/public/asset/logo.png";
import LogoWhite from "/public/asset/logo_w.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo({ link = false }: { link?: boolean }) {
  const { theme } = useTheme();
  const router = useRouter();
  const transformThemeLogo = theme === "dark" ? LogoWhite : logoInital;

  const handleClick = () => {
    if (link) {
      router.push("/"); // 또는 원하는 경로
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
      />
    </div>
  );
}