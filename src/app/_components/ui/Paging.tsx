import React, { useEffect, useMemo } from "react";
import { CONST_PAGING, QUERY_STRING } from "@/types/constans";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import classes from "./Paging.module.scss";

interface PagingProps {
  cnt: number;
}

type PagingType = "next" | "prev";

export default function Paging({ cnt = 1 }: PagingProps) {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  //State가지고 Paging 하기
  const router = useRouter();
  const url = usePathname();

  const pageString = params.get(QUERY_STRING.PAGE);
  const pageNumber = pageString ? +pageString : 1; //현재 페이지
  const pageLength = Math.ceil(cnt / CONST_PAGING.LIMIT) || 1; //전체 페이지

  console.log(pageNumber, pageLength);

  useEffect(() => {
    //오류보단 replace로
    //filter 오류는 Server Component에서 notFound() 처리
    if (pageNumber <= 0 || pageLength < pageNumber) {
      router.replace("/template");
    }
  }, [pageNumber]);

  const updateQuertString = (page: number) => {
    params.set("page", page + "");
    router.push(`${url}?${params.toString()}`);
  };

  //click Moveing
  const queryStringHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const page = +e.currentTarget.value;
    updateQuertString(page);
  };

  //prev next moving
  const pagingHandler = (nav: PagingType) => {
    const newPage = nav === "next" ? pageNumber + 1 : pageNumber - 1;
    updateQuertString(newPage);
  };

  //page Arr
  const pageArr = () => {
    const pageArr = Array.from({ length: pageLength }, (_, idx) => idx + 1);
    if (pageLength < 6) {
      return pageArr;
    }
    if (pageNumber <= 3) {
      return [...pageArr.slice(0, 4), "...", pageLength];
    } else if (pageNumber >= pageLength - 2) {
      return [1, "...", ...pageArr.slice(-4)];
    } else {
      return [
        1,
        "...",
        pageNumber - 1,
        pageNumber,
        pageNumber + 1,
        "...",
        pageLength,
      ];
    }
  };

  const pages = pageArr();

  return (
    <div className={classes.pagingWrap}>
      <button
        aria-label="prevNav"
        onClick={() => pagingHandler("prev")}
        disabled={pageNumber <= 1}
      >
        prev
      </button>
      {pages.map((page, idx) => {
        return (
          <button
            onClick={queryStringHandler}
            type="button"
            key={`page-${idx}`}
            value={page}
            className={page === pageNumber ? classes.active : undefined}
            disabled={typeof page === "string"} // ... 클릭 방지
            aria-label={`nav-${page}`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => pagingHandler("next")}
        disabled={pageNumber >= pageLength}
        aria-label="nextNav"
      >
        Next
      </button>
    </div>
  );
}
