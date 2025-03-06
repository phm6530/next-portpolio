import requestHandler from "@/utils/withFetch";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import { useForm, useFormContext } from "react-hook-form";
import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import Search from "/public/asset/icon/search.svg";
import SearchBar from "@/components/ui/SearchBar/search-input";
import CustomModal from "@/components/shared/modals/custom-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import SkeletonImage from "@/components/shared/loading/skeleton-image";
import CustomButton from "@/components/ui/button-custom";
import NotFoundContents from "@/components/ui/error/notfound-contents";

// unplashe Api Type임
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

type SearchForm = { keyword: string };

function UnSplashContents({ closeModal }: { closeModal: () => void }) {
  const { setValue } = useFormContext<RequestSurveyFormData>();
  const formMethod = useForm<SearchForm>({
    defaultValues: { keyword: "" },
  });

  const { control, handleSubmit, getValues } = formMethod;

  const {
    mutate: searchMutate,
    data,
    isPending,
  } = useMutation<UnsplashApi, Error, string>({
    mutationFn: async (searchText: string) => {
      return requestHandler(async () => {
        const encodingText = encodeURI(searchText);
        return fetch(
          `https://api.unsplash.com/search/photos?query=${encodingText}&client_id=PIkUJ8qatZ2000yVp0DzplIL15unNYVPJ3GsjXtWDSE&per_page=30&page=1`
        );
      });
    },
  });

  const onSearchHandler = (data: SearchForm) => {
    console.log(data);
    searchMutate(data.keyword);
  };

  const selectSlug = async (imgUrl: string) => {
    setValue("thumbnail", imgUrl);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-5">
      <Form {...formMethod}>
        <form onSubmit={handleSubmit(onSearchHandler)}>
          <FormField
            name="keyword"
            control={control}
            rules={{
              required: "검색어를 입력해주세요",
            }}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    {/* Search Bar */}
                    <SearchBar
                      {...field}
                      placeholder="이미지 키워드를 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>

      <div>
        {/* 한번 touch 해야 div 생성하게 함 */}
        {getValues("keyword") ? (
          // 로딩 시 스켈레톤 띄움
          isPending ? (
            <div className="grid gap-3 max-h-[400px] overflow-y-scroll grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              <SkeletonImage />
              <SkeletonImage />
              <SkeletonImage />
              <SkeletonImage />
              <SkeletonImage />
              <SkeletonImage />
            </div>
          ) : (
            <>
              {data?.total !== 0 ? (
                <div className="grid gap-3 max-h-[400px] custom-scroll overflow-y-scroll grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                  {data?.results.map((e, key) => {
                    return (
                      <div
                        className="cursor-pointer relative [aspect-ratio:16/9]"
                        key={`${key}-wrap`}
                        onClick={() => selectSlug(e.urls.regular)}
                      >
                        <Image
                          src={e.urls.regular}
                          alt={e.alternative_slugs.ko}
                          style={{ objectFit: "cover" }}
                          fill
                          sizes="(max-width : 768px) 100vw"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <NotFoundContents>
                  &apos;{getValues("keyword")}&lsquo;과 일치하는 이미지가
                  없습니다.
                </NotFoundContents>
              )}
            </>
          )
        ) : null}
      </div>
    </div>
  );
}

export default function UnSplashThumbNail() {
  const [modal, setModal] = useState<boolean>(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  return (
    <>
      <CustomModal
        className="max-w-2xl w-[90%] text-left"
        title={`사용하실 섬네일 키워드를\n 검색해보세요`}
        description={`UnSlash Api 사용으로 검색어를 영어로 입력하시면 더 정확한 결과를 검색합니다. \n 예) 동물 > animal`}
        open={modal}
        onClose={closeModal}
      >
        <UnSplashContents closeModal={closeModal} />
      </CustomModal>

      <CustomButton onClick={openModal}>
        <Search />
        이미지 검색기
      </CustomButton>
    </>
  );
}
