"use client";
import CustomModal from "@/components/shared/modals/custom-modal";
import { DialogTitle } from "@/components/ui/dialog";
import { Plus, PlusCircle, View } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";

type ZoomableImageProps = {
  image: string;
  alt: string;
};

const ZoomableImage: React.FC<ZoomableImageProps> = ({ image, alt }) => {
  const [view, setView] = useState<boolean>(false);

  return (
    <>
      <div className="relative mt-2 overflow-hidden rounded-md w-full pb-[60%]">
        <Image
          src={image}
          style={{ maxWidth: 700, objectFit: "cover" }}
          alt="preview"
          fill
          priority
          sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
        />

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
      <Button
        variant={"outline"}
        className="text-[12px] flex justify-center items-center gap-2 mt-2"
        onClick={() => setView(true)}
      >
        <span className="mt-0">자세히보기</span> <Plus />
      </Button>
    </>
  );
};

export default ZoomableImage;
