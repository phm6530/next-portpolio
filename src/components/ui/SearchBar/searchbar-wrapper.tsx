"use client";
import SearchBar from "@/components/ui/SearchBar/search-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function SearchBarWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [keyword, setKeyword] = useState<string>("");

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
    <form className="flex-1" onSubmit={serSearchKeyword}>
      <SearchBar
        name="keyword"
        onChange={(e) => setKeyword(e.currentTarget.value)}
      />
    </form>
  );
}
