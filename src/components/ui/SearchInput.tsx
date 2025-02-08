"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  Suspense,
  useEffect,
  useState,
} from "react";
import classes from "./searchArea.module.scss";
import { QUERY_STRING } from "@/types/constans";
// import SearchIcon from "/public/asset/icon/search.png";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { withFetch } from "@/util/clientUtil";
import { BASE_URL } from "@/config/base";
// import Test from "@/components/ui/Test";

export default function SearchInput({ search }: { search?: string }) {
  const [curSearch, setCurSearch] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>(search || "");
  const router = useRouter();

  const qs = useSearchParams();

  const onClick = async () => {
    return withFetch(async () => {
      return fetch(`${BASE_URL}/api/test`, {
        headers: { "x-id": "test" },
        next: {
          tags: ["test"],
        },
      });
    });
  };

  useEffect(() => {
    const search = qs.get(QUERY_STRING.SEARCH);
    setSearchText(!search ? "" : search);
    setCurSearch(search);
  }, [qs]);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      searchText ? `/template?search=${searchText}` : "/template ",
      {
        scroll: false,
      }
    );
  };
  const clearSearch = () => {
    setCurSearch(null);
    setSearchText("");
    router.push("/template", { scroll: false }); // 쿼리스트링 제거
  };
  return (
    <>
      {/* 검색어 버튼 */}
      {curSearch && (
        <div className={classes.curSearch}>
          <span>{curSearch}</span>
          <Button.closeBtn onClick={clearSearch} />
        </div>
      )}

      <form className={classes.searchForm} onSubmit={searchHandler}>
        <input
          type="text"
          value={searchText}
          onChange={onChangeText}
          placeholder="검색어를 기재해주세요"
          autoComplete="off"
        />
        <button
          type="button"
          style={{
            position: "relative",
            backgroundColor: "transparent",
          }}
        >
          {/* <Image
            src={SearchIcon}
            style={{ objectFit: "contain" }}
            alt="searchIcon"
          /> */}
        </button>
      </form>
    </>
  );
}
