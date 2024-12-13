import usePopup from "@/app/hook/usePopup";
import requestHandler from "@/utils/withFetch";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import classes from "./UnsplashTunmbNail.module.scss";
import Image from "next/image";
import { useForm, useFormContext } from "react-hook-form";
import { RequestSurveyFormData } from 
  "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";

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

type SearchForm = {keyword: string};

function UnSplashContents({
  setImgPending,
  setImgError,
  closeModal,
}: {
  setImgPending: Dispatch<SetStateAction<boolean>>;
  setImgError: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const { setValue } = useFormContext<RequestSurveyFormData>();

  const {
    handleSubmit, 
    register,
    formState: { errors } 
  } = useForm<SearchForm>({ defaultValues: { keyword: "" } });

  const { mutate, data, isPending, isError } = useMutation<
    UnsplashApi,
    Error,
    string
  >({
    mutationFn: async (searchText: string) => {
      return requestHandler(async () => {
        const encodingText = encodeURI(searchText);
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

  const onSearchHandler = (data : SearchForm) => {
    console.log(data.keyword);
    if (ref.current?.value) {
      mutate(ref.current.value);
    }
  };

  const selectSlug = (imgUrl: string) => {
    setValue("thumbnail", imgUrl);
    closeModal();
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.titleWrapper}>
        <h2 className={classes.title}>사용하실 섬네일 키워드를 <br></br> 
          아래 검색창에 적어주세요</h2>
        <div className={classes.titleText}>
          <p>UnSlash Api 사용으로 영어로 검색하시면 더 정확한 사진을 검색합니다.</p>
          <p>예{")"} 검색은 Search</p>
        </div>
      </div>
      <div className={classes.search}>
        <form onSubmit={handleSubmit(onSearchHandler)}>
        <input
          placeholder="생성하실 섬네일을 검색해주세요"
          {...register("keyword" , 
            { required: "검색어를 기재해주세요!" })}
      
        />
        <button type="submit">
          검색
        </button>
        </form>
      </div>

      <div>
        {isPending && "loading....."}
        {data && (
          <div className={classes.slugItemsWrap}>
            {data.results.map((e, key) => {
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
        )}
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

      <button type="button" onClick={openModal}>
        썸네일 검색기
      </button>
    </>
  );
}
