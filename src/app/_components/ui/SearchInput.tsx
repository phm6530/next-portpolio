"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./searchArea.module.scss";

export default function SearchInput() {
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      searchText.length !== 0 ? `/template?search=${searchText}` : "/survey "
    );
  };

  return (
    <div>
      <form className={classes.searchForm} onSubmit={searchHandler}>
        <input
          type="text"
          value={searchText}
          onChange={onChangeText}
          placeholder="검색어를 기재해주세요"
          autoComplete="off"
        />
        <button type="button">검색</button>
      </form>
    </div>
  );
}
