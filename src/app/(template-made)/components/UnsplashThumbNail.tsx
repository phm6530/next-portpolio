import usePopup from "@/app/hook/usePopup";
import { QUERY_KEY } from "@/types/constans";
import requestHandler from "@/utils/withFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import classes from "./UnsplashTunmbNail.module.scss";
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

export default function UnSplashThumbNail() {
  const [imgSearch, setImgSearch] = useState<string | null>(null);
  const { setView, PopupRender } = usePopup();

  const { mutate, data, isPending, isSuccess } = useMutation<
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
        ).then((res) => res.json());
      });
    },
  });

  const onSearchHandler = () => {
    if (imgSearch) mutate(imgSearch); // 검색어가 있을 때만 mutate 실행
  };

  return (
    <>
      <PopupRender className={classes.popupWidth}>
        <div className={classes.wrap}>
          <div className={classes.search}>
            <input onChange={(e) => setImgSearch(e.currentTarget.value)} />
            <button type="button" onClick={onSearchHandler}>
              검색
            </button>
          </div>
        </div>
      </PopupRender>

      <button type="button" onClick={() => setView(true)}>
        썸네일 검색기
      </button>
    </>
  );
}
