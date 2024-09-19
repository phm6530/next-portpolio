import { withFetch } from "@/util/clientUtil";
import { QUERY_STRING } from "@/types/constans";
import { GetTemplateMetaLists, TemplateTypeProps } from "@/types/template";
import { BASE_URL } from "@/config/base";

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

    return fetch(`${BASE_URL}/api/template?${queryParams}`);
  });
}

//Template 디테일
export function fetchTemplateDetail<T>(
  templateType: TemplateTypeProps,
  id: number
): Promise<T> {
  return withFetch<T>(async () => {
    return fetch(`${BASE_URL}/api/template/${templateType}/${id}`, {
      cache: "no-cache",
    });
  });
}
