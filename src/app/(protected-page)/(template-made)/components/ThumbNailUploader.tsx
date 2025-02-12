import classes from "./ThumbNailUploader.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import ImageUploadHandler from "@/utils/img-uploader";
import UnSplashThumbNail from "./UnsplashThumbNail";
import { FetchTemplateForm } from "@/types/template.type";
import imgUpload from "/public/asset/icon/imgUpload.svg";
import FormToolButton from "./FormToolButton";
import FormRegisterError from "@/components/Error/FormRegisterError";
import UploadedImagePreview from "./ImageContainer/UploadedImagePreview";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";

/**
 * template_type : 템플릿 종류
 * template_key : 이미지 키 + 템플릿 키
 */
export default function ThumbNailUploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<FetchTemplateForm>();
  const [imgPending, setImgPending] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const key = watch("templateKey");
  const tempThumbNail = watch("thumbnail");

  /**배치 때문인지 썸네일 에러 검사 안함 triiger 처리 */
  useEffect(() => {
    if (tempThumbNail) {
      trigger("thumbnail");
    }
  }, [tempThumbNail, trigger]);

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
        {thumnbNailPending ? (
          <div className={classes.thumbnailWrapper}>
            <LoadingSkeleton loadingText="UP LOADING..." />
          </div>
        ) : (
          tempThumbNail && (
            <div className={classes.thumbnailWrapper}>
              <UploadedImagePreview
                src={tempThumbNail}
                deleteFunc={clearPreview}
              />
            </div>
          )
        )}
      </>{" "}
      <div className={classes.buttonWrapper}>
        <FormToolButton
          clickEvent={() => fileRef.current?.click()}
          Svg={imgUpload}
        >
          썸네일 업로드하기
        </FormToolButton>

        <UnSplashThumbNail
          setImgPending={setImgPending}
          setImgError={setImgError}
        />
      </div>
      {errors.thumbnail && (
        <FormRegisterError errorMsg={errors.thumbnail?.message} />
      )}
    </>
  );
}
