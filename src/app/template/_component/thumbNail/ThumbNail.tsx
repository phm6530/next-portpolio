import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ThumbNail({
  thumbnail,
  className,
}: {
  thumbnail: string | null;
  className?: string;
}) {
  const isUrl = thumbnail?.includes("https:");

  if (!isUrl) return;

  return (
    <div
      className={cn(
        "w-full rounded-xl overflow-hidden border relative pb-[50%]",
        className
      )}
    >
      <>
        {!!thumbnail ? (
          <Image
            src={thumbnail}
            alt="alt"
            sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          " "
        )}
      </>
    </div>
  );
}
