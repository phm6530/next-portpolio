"use client";
import CustomModal from "@/components/shared/modals/custom-modal";
import { DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

type ImageViewerProps = {
  image: string;
  alt: string;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ image, alt }) => {
  const [view, setView] = useState<boolean>(false);

  return (
    <div className="relative mt-2 overflow-hidden rounded-md w-full pb-[60%]">
      <Image
        src={image}
        style={{ maxWidth: 700, objectFit: "cover" }}
        alt="preview"
        fill
        priority
        sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
      />

      <button
        onClick={() => setView(true)}
        className="z-10 r-2 b-2 bg-transparent border rounded-full absolute py-2 px-3 text-xs"
      >
        자세히 보기
      </button>

      <CustomModal
        className="w-[90%] max-w-[800px] overflow-hidden"
        open={view}
        onClose={() => setView(false)}
      >
        {/* Image Zoom Button */}
        <>
          <DialogTitle>{alt}</DialogTitle>
          <div className="relative w-full pb-[80%] overflow-hidden border border-muted-foreground/40 rounded-lg">
            <Image
              src={image}
              alt={alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw"
            />
          </div>
        </>
      </CustomModal>
    </div>
  );
};

export default ImageViewer;
