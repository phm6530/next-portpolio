import Image from "next/image";
import classes from "./thumbnail.module.scss";

export default function ThumbNail({ thumbnail }: { thumbnail: string | null }) {
  const isUrl = thumbnail?.includes("https:");

  if (!isUrl) return;

  return (
    <div className={classes.thumbNailContainer}>
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
