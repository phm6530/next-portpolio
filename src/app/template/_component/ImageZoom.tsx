"use client";

import usePreview from "@/app/template/made/[templateType]/_component/Preview/usePreview";
import classes from "./ImageZoom.module.scss";
import Image from "next/image";

type ImageZoomProps = {
  alt: string;
  image: string;
};

const ImageZoom: React.FC<ImageZoomProps> = ({ alt, image }) => {
  const { setView, RenderPreview } = usePreview();

  const onClickHandler = () => {
    setView(true);
  };

  return (
    <>
      <RenderPreview>
        <div className={classes.imgWrap}>
          <Image src={image} alt={alt} fill style={{ objectFit: "cover" }} />
        </div>
      </RenderPreview>
      <button className={classes.previewBtn} onClick={onClickHandler}>
        자세히 보기
      </button>
    </>
  );
};

export default ImageZoom;
