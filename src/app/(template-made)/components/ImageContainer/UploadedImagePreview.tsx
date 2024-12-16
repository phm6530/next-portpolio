import Image from "next/image";
import classes from "./UploadedImagePreview.module.scss";

export default function UploadedImagePreview({
  src,
  deleteFunc,
}: {
  src: string;
  deleteFunc: () => void;
}) {
  return (
    <div className={classes.imageContainer}>
      <div className={classes.imageWrapper}>
        <Image
          src={src}
          sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
          alt="preview"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <button type="button" onClick={deleteFunc}>
        이미지 삭제
      </button>
    </div>
  );
}
