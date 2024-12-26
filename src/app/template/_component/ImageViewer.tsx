import ImageZoom from "@/app/template/_component/ImageZoom";
import Image from "next/image";
import classes from "./ImageViewer.module.scss";

type ImageViewerProps = {
  image: string;
  alt: string;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ image, alt }) => {
  return (
    <div className={classes.previewContainer}>
      <Image
        src={image}
        style={{ maxWidth: 700, objectFit: "cover" }}
        alt="preview"
        fill
        priority
        sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
      />
      {/* Image Zoom Button */}
      <ImageZoom alt={alt} image={image} />
    </div>
  );
};

export default ImageViewer;
