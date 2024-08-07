import { withFetch } from "@/app/lib/helperClient";
import { templateItemProps, TemplateProps } from "@/types/template";

//getList
export function fetchList(): Promise<templateItemProps[]> {
  return withFetch<templateItemProps[]>(() => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/template`, {
      next: {
        revalidate: 10,
      },
    });
  });
}

//Template 디테일
export function fetchTemplateDetail<T>(
  templateType: TemplateProps,
  id: number
): Promise<T> {
  return withFetch<T>(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/template/${templateType}/${id}`,
      {
        next: {
          revalidate: 10,
          tags: ["surveyItem", id + ""],
        },
      }
    );
  });
}
