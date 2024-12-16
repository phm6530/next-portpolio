import usePopup from "@/app/hook/usePopup";
import requestHandler from "@/utils/withFetch";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import classes from "./UnsplashTunmbNail.module.scss";
import Image from "next/image";
import { useForm, useFormContext } from "react-hook-form";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import FormRegisterError from "@/components/Error/FormRegisterError";
import Search from "/public/asset/icon/search.svg";
import FormToolButton from "./FormToolButton";
import { resolve } from "path";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";

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

// type PixabayApi = {
//   total: number;
//   totalHits: number;
//   hits: {
//     webformatURL: string;
//     largeImageURL: string;
//     tags: string;
//   }[];
// };

type SearchForm = { keyword: string };

function UnSplashContents({
  setImgPending,
  setImgError,
  closeModal,
}: {
  setImgPending: Dispatch<SetStateAction<boolean>>;
  setImgError: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}) {
  const { setValue } = useFormContext<RequestSurveyFormData>();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<SearchForm>({ defaultValues: { keyword: "" } });

  const { mutate, data, isPending, isError } = useMutation<
    UnsplashApi,
    Error,
    string
  >({
    mutationFn: async (searchText: string) => {
      return requestHandler(async () => {
        const encodingText = encodeURI(searchText);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetch(
          `https://api.unsplash.com/search/photos?query=${encodingText}&client_id=PIkUJ8qatZ2000yVp0DzplIL15unNYVPJ3GsjXtWDSE&per_page=30&page=1`,
          { cache: "no-cache" }
        );
      });
    },
  });

  useEffect(() => {
    if (isPending) {
      setImgPending(true);
    }
  }, [isPending, setImgPending]);

  useEffect(() => {
    if (isError) {
      setImgError(true);
    }
  }, [isError, setImgError]);

  const onSearchHandler = (data: SearchForm) => {
    mutate(data.keyword);
  };

  const selectSlug = (imgUrl: string) => {
    setValue("thumbnail", imgUrl);
    closeModal();
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.titleWrapper}>
        <h2 className={classes.title}>
          사용하실 섬네일 키워드를 <br></br>
          아래 검색창에 적어주세요
        </h2>

        <div className={classes.titleText}>
          <p>
            UnSlash Api 사용으로 검색어를 영어로 입력하시면 더 정확한 결과를
            검색합니다.
          </p>
          <p>예{")"} 검색은 Search</p>
        </div>
      </div>

      <div className={classes.search}>
        <input
          placeholder="생성하실 섬네일을 검색해주세요"
          {...register("keyword", { required: "검색어를 기재해주세요!" })}
          autoComplete="off"
        />
        <button type="button" onClick={handleSubmit(onSearchHandler)}>
          검색
        </button>
      </div>

      {Object.values(errors)[0]?.message && (
        <FormRegisterError errorMsg={Object.values(errors)[0]?.message} />
      )}
      <div>
        {/* 한번 touch 해야 div 생성하게 함 */}
        {touchedFields?.keyword ? (
          // 로딩 시 스켈레톤 띄움
          isPending ? (
            <div className={classes.slugItemsWrap}>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>
          ) : (
            <>
              {data?.total !== 0 ? (
                <div className={classes.slugItemsWrap}>
                  {data?.results.map((e, key) => {
                    return (
                      <div
                        className={classes.slugItem}
                        key={`${key}-wrap`}
                        onClick={() => selectSlug(e.urls.regular)}
                      >
                        <Image
                          src={e.urls.regular}
                          alt={e.alternative_slugs.ko}
                          style={{ objectFit: "cover" }}
                          fill
                          sizes="(max-width : 768px) 100vw"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={classes.notfoundSearch}>
                  '{getValues("keyword")}'과 일치하는 이미지가 없습니다.
                </div>
              )}
            </>
          )
        ) : null}
      </div>
    </div>
  );
}

export default function UnSplashThumbNail({
  setImgPending,
  setImgError,
}: {
  setImgPending: Dispatch<SetStateAction<boolean>>;
  setImgError: Dispatch<SetStateAction<boolean>>;
}) {
  const { isOpen, openModal, closeModal, PopupComponent } = usePopup();

  return (
    <>
      <PopupComponent
        isOpen={isOpen}
        closeModal={closeModal}
        className={classes.popupWidth}
      >
        <UnSplashContents
          setImgPending={setImgPending}
          setImgError={setImgError}
          closeModal={closeModal}
        />
      </PopupComponent>

      <FormToolButton clickEvent={() => openModal()} Svg={Search}>
        썸네일 검색기
      </FormToolButton>
    </>
  );
}
