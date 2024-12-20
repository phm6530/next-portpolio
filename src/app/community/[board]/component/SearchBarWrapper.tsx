"use client";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface SearchForm {
  keyword: string;
}

export default function SearchBarWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { register, handleSubmit } = useForm<SearchForm>();

  const serSearchKeyword: SubmitHandler<SearchForm> = (data) => {
    const params = new URLSearchParams(
      searchParams.size > 0 ? searchParams.toString() : ""
    );

    // 'search' 처리 로직
    if (data.keyword.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", data.keyword);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <SearchBar
      register={register("keyword")}
      clickEvent={handleSubmit(serSearchKeyword)}
      placeholder="검색어를 입력해주세요"
    />
  );
}
