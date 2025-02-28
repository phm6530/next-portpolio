import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UploadedImagePreview({
  src,
  deleteFunc,
}: {
  src: string;
  deleteFunc: () => void;
}) {
  return (
    <div className="flex flex-col justify-start gap-3 items-start">
      <div className="border rounded-lg overflow-hidden [aspect-ratio:16/9] w-full bg-custom-input relative ">
        <Image
          src={src}
          sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
          alt="preview"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <Button
        className="text-sm"
        type="button"
        variant={"outline"}
        onClick={deleteFunc}
      >
        이미지 삭제
      </Button>
    </div>
  );
}
