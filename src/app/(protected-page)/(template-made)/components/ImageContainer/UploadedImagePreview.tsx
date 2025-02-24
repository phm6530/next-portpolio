import Image from "next/image";

export default function UploadedImagePreview({
  src,
  deleteFunc,
}: {
  src: string;
  deleteFunc: () => void;
}) {
  return (
    <div className="flex flex-col flex-1">
      <div className="border rounded-lg overflow-hidden [aspect-ratio:16/9] bg-custom-input relative ">
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
