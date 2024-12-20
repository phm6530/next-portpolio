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

  const keyword = searchParams.get("search");

  const { register, handleSubmit } = useForm<SearchForm>({
    defaultValues: {
      keyword: keyword ? keyword : "",
    },
  });

  const serSearchKeyword: SubmitHandler<SearchForm> = (data) => {
    const params = new URLSearchParams(
      searchParams.size ? searchParams.toString() : ""
    );

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
