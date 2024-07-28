"use client";

import custumHook from "@/app/test/custum";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";

const searchArr = [
  "인기검색어",
  "인기검색어11",
  "인기검색어22",
  "인기검색어33",
  "박현민",
  "테스트!?",
];

//서버라고 가정
const fetch = async (value: string) => {
  try {
    console.log("나실행");
    const filter = searchArr.filter((e) => {
      return e.includes(value);
    });

    return filter;
  } catch (error) {
    throw new Error("에러");
  }
};

export default function SearchInput() {
  const [value, setValue] = useState<string>("");
  const debouncedValue = custumHook(value, 500);

  const {
    data: preSearchList,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["key", debouncedValue],
    queryFn: () => fetch(debouncedValue),
    enabled: !!debouncedValue,
    staleTime: 5 * 60 * 3600,
  });

  // 검색어 등록
  const setSearchComment = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedText = e.currentTarget.textContent;
    if (selectedText) {
      setValue(selectedText);
    }
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input type="text" value={value} onChange={onChangeSearch} />

      {/* 인기검색어 */}
      {isLoading && "연관 검색어 가져오는중.."}
      {isSuccess &&
        (preSearchList.length === 0 ? (
          "검색어가 없네요"
        ) : (
          <>
            {preSearchList.map((e, idx) => {
              return (
                <div
                  className="searchItem"
                  key={`search-${idx}`}
                  onClick={setSearchComment}
                >
                  {e}
                </div>
              );
            })}
          </>
        ))}
    </>
  );
}
