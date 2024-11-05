import Image from "next/image";
import classes from "./ThumbNailUploader.module.scss";
import { ChangeEvent, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import ImageUploadHandler from "@/utils/img-uploader";
import UnSplashThumbNail from "@/app/(template-made)/components/UnsplashThumbNail";

/**
 * template_type : 템플릿 종류
 * template_key : 이미지 키 + 템플릿 키
 */
export default function ThumbNailUploader() {
  const fileRef = useRef<HTMLInputElement>(null);

  const { setValue, watch } = useFormContext();
  const key = watch("key");
  const tempThumbNail = watch("thumbnail");

  const {
    mutate,
    isPending: thumnbNailPending,
    isSuccess: thumnbNailSucess,
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

  const clearPreview = () => {
    setValue("thumbnail", "");
    reset();
  };

  return (
    <>
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={thumbNailhandler}
      />

      {/* 썸네일 preView */}
      {(thumnbNailPending || thumnbNailSucess) && (
        <>
          <div className={classes.previewContainer}>
            {thumnbNailPending && "loading......"}
            {thumnbNailSucess && tempThumbNail && (
              <Image
                src={tempThumbNail}
                sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
                alt="preview"
                style={{ objectFit: "cover" }}
                fill
              />
            )}
          </div>
          {/* {ref.current?.value} */}
          <button type="button" onClick={clearPreview}>
            이미지 삭제
          </button>
        </>
      )}

      <button type="button" onClick={() => fileRef.current?.click()}>
        썸네일 업로드하기
      </button>
      <UnSplashThumbNail />
      {/* <button type="button" onClick={() => setThumNailEditor(true)}>
        추천 썸네일 이미지
      </button> */}
    </>
  );
}
