import Image from "next/image";
import classes from "./ThumbNailUploader.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { imgUploader } from "@/app/lib/uploaderHanlder";
import { withFetch } from "@/app/lib/helperClient";
import { QUERY_KEY } from "@/types/constans";
import pixabayJson from "./pixabay.json";
import { resolve } from "path";

type UnsplashApi = {
  total: number;
  total_pages: number;
  results: {
    urls: {
      regular: string;
      raw: string;
      small: string;
    };
    alternative_slugs: {
      ko: string;
    };
  }[];
};

type PixabayApi = {
  total: number;
  totalHits: number;
  hits: {
    webformatURL: string;
    largeImageURL: string;
    tags: string;
  }[];
};

/**
 * template_type : 템플릿 종류
 * template_key : 이미지 키 + 템플릿 키
 */
export default function ThumbNailUploader({
  template_type,
  template_key,
}: {
  template_type: string;
  template_key: string;
}) {
  const [thumNailEditor, setThumNailEditor] = useState<Boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [imgKeyword, setImgKeyword] = useState<string>("");
  const [imgSearch, setImgSearch] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  const [preView, setPreview] = useState<string | null>(null);

  const { setValue } = useFormContext();

  const [processedData, setProcessedData] = useState<
    {
      largeImageURL: string;
      webformatURL: string;
      alt: string;
    }[]
  >();

  //upLoader
  const thumbNailhandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!!files) {
      const img = files[0];

      //썸네일 업로드
      const imgUrl = await imgUploader(template_type, img, { template_key });
      if (imgUrl) {
        //hook form에 반영함
        setValue("thumbnail", imgUrl);
        setPreview(`${process.env.NEXT_PUBLIC_BASE_URL}/${imgUrl}`);
      }
    }
  };

  const { data, isPending, isSuccess } = useQuery<PixabayApi>({
    queryKey: [QUERY_KEY.UNSPLASH, imgSearch],
    queryFn: () => {
      return withFetch(async () => {
        if (imgSearch) {
          const encodingText = encodeURI(imgSearch);
          return fetch(
            `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${encodingText}&image_type=photo&pretty=true&per_page=32`,
            {
              cache: "no-cache",
            }
          );
        } else {
          return 0 as never;
        }
      });
    },
    enabled: !!imgSearch,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const processedDataArr = data.hits.map((item) => ({
        largeImageURL: item.largeImageURL,
        webformatURL: item.webformatURL,
        alt: item.tags,
      }));

      setProcessedData(processedDataArr);
    }
  }, [isSuccess, data]);

  const onSearchImg = () => {
    const keyword = imgKeyword.trim();

    // 검색어가 비어 있는지 확인
    if (keyword.length === 0) {
      alert("검색어를 입력해 주세요.");
      return;
    }

    // 검색 실행 로직
    setTouched(true); //touched
    setImgSearch(keyword);
  };

  const clearPreview = () => {
    setValue("thumbnail", "");
    setPreview(null);
  };

  return (
    <>
      {thumNailEditor && (
        <div className={classes.thumNailEditor}>
          <input
            type="text"
            placeholder="생성할 키워드를 적어주세요"
            autoComplete="off"
            value={imgKeyword}
            onChange={(e) => setImgKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // 폼 제출 방지
                onSearchImg(); // Enter 키를 눌렀을 때 검색 실행
              }
            }}
          />
          <p>생성하실 썸네일의 키워드를 적어주세요, ex) 고양이 , 강아지 </p>
          <p>영어로 검색하시면 더 정확한 검색이 가능합니다!</p>
          <button type="button" onClick={onSearchImg}>
            썸네일 검색
          </button>

          <div className={classes.unsplashImgWrap}>
            {touched && (
              <div className={classes.unsplashImgList}>
                {isPending ? (
                  "검색중 .... "
                ) : processedData && processedData.length > 0 ? (
                  <>
                    {processedData.map((e, idx) => {
                      return (
                        <div
                          className={classes.unsplashItem}
                          key={`thumbnail-${idx}`}
                          onClick={() => {
                            setValue("thumbnail", e.webformatURL);
                            setPreview(e.webformatURL);
                          }}
                        >
                          <Image
                            src={e.webformatURL}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{
                              objectFit: "contain",
                            }}
                            alt={e.alt}
                            quality={50}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  "없습니다."
                )}
              </div>
            )}
          </div>

          <button type="button" onClick={() => setThumNailEditor(false)}>
            닫기
          </button>
        </div>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={thumbNailhandler}
      />

      {/* 썸네일 preView */}
      {preView && (
        <>
          <div className={classes.previewContainer}>
            <Image
              src={preView}
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
              style={{
                objectFit: "cover",
              }}
              alt="preview"
              priority
            />
          </div>
          <button onClick={clearPreview}>썸네일삭제</button>
        </>
      )}

      <button type="button" onClick={() => fileRef.current?.click()}>
        썸네일 업로드하기
      </button>
      <button type="button" onClick={() => setThumNailEditor(true)}>
        추천 썸네일 이미지
      </button>
    </>
  );
}