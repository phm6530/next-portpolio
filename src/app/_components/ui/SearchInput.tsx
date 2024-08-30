"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import classes from "./searchArea.module.scss";
import { QUERY_STRING } from "@/types/constans";
import SearchIcon from "/public/asset/icon/search.png";
import Image from "next/image";

export default function SearchInput({ search }: { search?: string }) {
  const [searchText, setSearchText] = useState<string>(search || "");
  const router = useRouter();

  const qs = useSearchParams();

  useEffect(() => {
    const search = qs.get(QUERY_STRING.SEARCH);
    setSearchText(!search ? "" : search);
  }, [qs]);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(searchText ? `/template?search=${searchText}` : "/template ", {
      scroll: false,
    });
  };

  return (
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
        style={{ position: "relative", background: "#fff" }}
      >
        <Image src={SearchIcon} width={30} height={30} alt="searchIcon" />
      </button>
    </form>
  );
}
