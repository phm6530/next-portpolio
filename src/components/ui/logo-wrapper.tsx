import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LogoWrapper({
  maxWidth = 200,
  link = false,
}: {
  maxWidth?: number;
  link?: boolean;
}) {
  return (
    <Link href={"/"}>
      <div
        className={cn(
          "w-full bg-contain bg-[url('/asset/logo.png')] dark:bg-[url('/asset/logo_w.png')]",
          link && "cursor-pointer"
        )}
        style={{ maxWidth }}
      >
        <div className="pb-[25%] " />
      </div>
    </Link>
  );
}
