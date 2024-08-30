import { withFetch } from "@/app/lib/helperClient";
import { QUERY_STRING } from "@/types/constans";
import { GetTemplateMetaLists, TemplateTypeProps } from "@/types/template";

//get-List
export function fetchList(
  page: string,
  sort?: string,
  search?: string
): Promise<GetTemplateMetaLists> {
  return withFetch<GetTemplateMetaLists>(async () => {
    const queryParams = new URLSearchParams({
      page,
    });

    //정렬
    if (sort) {
      queryParams.append(QUERY_STRING.SORT, sort);
    }
    //서치 키워드
    if (search) {
      queryParams.append(QUERY_STRING.SEARCH, search);
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/template?${queryParams}`,
      {
        cache: "no-cache",
      }
    );
  });
}

//Template 디테일
export function fetchTemplateDetail<T>(
  templateType: TemplateTypeProps,
  id: number
): Promise<T> {
  return withFetch<T>(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/template/${templateType}/${id}`,
      {
        cache: "no-cache",
      }
    );
  });
}
