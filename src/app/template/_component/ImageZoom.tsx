"use client";

import usePreview from "@/app/template/made/[templateType]/_component/Preview/usePreview";
import classes from "./ImageZoom.module.scss";
import Image from "next/image";
import usePopup from "@/app/hook/usePopup";

type ImageZoomProps = {
  alt: string;
  image: string;
};

const ImageZoom: React.FC<ImageZoomProps> = ({ alt, image }) => {
  const { isOpen, openModal, closeModal, PopupComponent } = usePopup();

  return (
    <>
      <PopupComponent
        className={classes.customPopup}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <div className={classes.imgWrap}>
          <Image
            src={image}
            alt={alt}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw"
          />
        </div>
      </PopupComponent>
      <button className={classes.previewBtn} onClick={openModal}>
        자세히 보기
      </button>
    </>
  );
};

export default ImageZoom;
