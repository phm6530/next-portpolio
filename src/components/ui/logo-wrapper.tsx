"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LogoWrapper({
  maxWidth = 200,
  link = false,
}: {
  maxWidth?: number;
  link?: boolean;
}) {
  const router = useRouter();

  return (
    <div
      className={cn(
        " w-full [aspect-ratio:16/4] bg-contain bg-center bg-[url('/asset/logo.png')]  dark:bg-[url('/asset/logo_w.png')]",
        link && "cursor-pointer"
      )}
      style={{ maxWidth }}
      {...(link && { onClick: () => router.push("/") })}
    />
  );
}
