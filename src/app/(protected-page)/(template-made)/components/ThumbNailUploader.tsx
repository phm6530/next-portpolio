import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import ImageUploadHandler from "@/utils/img-uploader";
import UnSplashThumbNail from "./UnsplashThumbNail";
import { FetchTemplateForm } from "@/types/template.type";
import ImgUpload from "/public/asset/icon/imgUpload.svg";
import UploadedImagePreview from "./ImageContainer/UploadedImagePreview";
import SkeletonImage from "@/components/shared/loading/skeleton-image";
import CustomButton from "@/components/ui/button-custom";
import { LucideUploadCloud } from "lucide-react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

/**
 * template_type : 템플릿 종류
 * template_key : 이미지 키 + 템플릿 키
 */
export default function ThumbNailUploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { setValue, watch, trigger } = useFormContext<FetchTemplateForm>();

  const key = watch("templateKey");
  const tempThumbNail = watch("thumbnail");
  const [isDragging, setIsDragging] = useState(false);

  /**배치 때문인지 썸네일 에러 검사 안함 triiger 처리 */
  useEffect(() => {
    if (tempThumbNail) {
      trigger("thumbnail");
    }
  }, [tempThumbNail, trigger]);

  const {
    mutate,
    isPending: thumnbNailPending,
    reset,
  } = useMutation({
    mutationFn: async (file: File) => {
      const endPoint = `common/image/${key}`;
      return await ImageUploadHandler(endPoint, file);
    },
    onSuccess: (data) => {
      setValue("thumbnail", data!.supabase_storage_imgurl);
    },
  });

  //upLoader
  const thumbNailhandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) mutate(files[0]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        mutate(file);
      } else {
        // 에러 처리
        toast.error("이미지 파일만 업로드 가능합니다");
      }
    }
  };

  const clearPreview = () => {
    setValue("thumbnail", "");
    reset();
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={thumbNailhandler}
      />

      <div
        className={cn(
          `
          w-full  hover:bg-point/10
          bg-custom-input
          cursor-pointer
          flex-col 
          transition-all p-5 min-h-[200px] rounded-md text-center flex gap-2 
          justify-center border border-muted-foreground/50 border-dashed
        `,
          (isDragging || tempThumbNail) &&
            "border-primary bg-primary/10 border-dashed"
        )}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileRef.current?.click()}
      >
        <>
          {thumnbNailPending ? (
            <div>
              <SkeletonImage />
            </div>
          ) : (
            tempThumbNail && (
              <div>
                <UploadedImagePreview
                  src={tempThumbNail}
                  deleteFunc={clearPreview}
                />
              </div>
            )
          )}
        </>
        {/* thunbnail없ㅇ므 */}
        {!tempThumbNail && !thumnbNailPending && (
          <div className="flex flex-col gap-2 items-center justify-center">
            <LucideUploadCloud className="w-10 h-10" />
            <p className="text-sm">
              {" "}
              클릭하여 썸네일 이미지 or Drag & Drop 해주세요
            </p>
          </div>
        )}
      </div>
      {/* 썸네일 preView */}

      <div className="grid gap-3 grid-cols-[1fr_1fr]">
        <CustomButton onClick={() => fileRef.current?.click()}>
          <ImgUpload />
          썸네일 업로드하기
        </CustomButton>

        {/* 검색기 */}
        <UnSplashThumbNail />
      </div>
    </div>
  );
}
