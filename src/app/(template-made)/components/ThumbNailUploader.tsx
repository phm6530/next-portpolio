import Image from "next/image";
import classes from "./ThumbNailUploader.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [imgPending, setImgPending] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const key = watch("key");
  const tempThumbNail = watch("thumbnail");

  const {
    mutate,
    isPending: thumnbNailPending,
    isError,
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

  useEffect(() => {
    if (thumnbNailPending) {
      setImgPending(true);
    }
  }, [thumnbNailPending]);

  useEffect(() => {
    if (isError) {
      setImgError(true);
    }
  }, [isError]);

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

      <>
        <div className={classes.previewContainer}>
          {!imgError ? (
            <>
              {imgPending && "loading......"}
              {tempThumbNail && (
                <Image
                  src={tempThumbNail}
                  sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
                  alt="preview"
                  style={{ objectFit: "cover" }}
                  fill
                  onLoad={() => setImgPending(false)}
                />
              )}
            </>
          ) : (
            "Error..."
          )}
        </div>
        {/* {ref.current?.value} */}
        <button type="button" onClick={clearPreview}>
          이미지 삭제
        </button>
      </>

      <button type="button" onClick={() => fileRef.current?.click()}>
        썸네일 업로드하기
      </button>
      <UnSplashThumbNail
        setImgPending={setImgPending}
        setImgError={setImgError}
      />
      {/* <button type="button" onClick={() => setThumNailEditor(true)}>
        추천 썸네일 이미지
      </button> */}
    </>
  );
}
