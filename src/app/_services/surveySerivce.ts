import { withFetch } from "@/app/lib/helperClient";
import { TemplateDetailProps } from "@/app/template/[...detail]/page";
import { ResposetemplateDatas, TemplateProps } from "@/types/template";

//getList
export function fetchList(
  page: string,
  ftiler: string = "all"
): Promise<ResposetemplateDatas> {
  return withFetch<ResposetemplateDatas>(() => {
    const queryParams = new URLSearchParams({
      page,
      ftiler,
    }).toString();

    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/template?${queryParams}`,
      {
        cache: "no-cache",
        // next: {
        //   revalidate: 10,
        // },
      }
    );
  });
}

//Template 디테일
export function fetchTemplateDetail<T>(
  templateType: TemplateProps,
  id: number
): Promise<T> {
  console.log("요청~~~~~~~~");
  return withFetch<T>(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/template/${templateType}/${id}`,
      {
        cache: "no-cache",
      }
    );
  });
}
