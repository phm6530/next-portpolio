"use client";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function SearchBarWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(searchParams.get("search") ?? "");
  }, [searchParams]);

  const serSearchKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword.trim() === "") {
      router.push(`${pathname}`);
    } else {
      router.push(`${pathname}?search=${keyword}`);
    }
  };

  return (
    <>
      <form
        className="border rounded-lg overflow-hidden  focus-within:border-muted-foreground  flex-1"
        onSubmit={serSearchKeyword}
      >
        <div className="flex items-center h-full">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoComplete="off"
            name="keyword"
            className="bg-transparent flex-1 h-full pl-4"
            placeholder="검색어를 입력해주세요"
          />
          <button type="submit" className="flex  p-2 pr-3">
            <SearchIcon />
          </button>
        </div>
      </form>
    </>
  );
}
