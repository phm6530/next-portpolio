import { withFetch } from "@/app/lib/helperClient";

export async function fetchDetailResult(id: string) {
  return withFetch(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/result?templateId=${id}`,
      {
        cache: "no-cache",
      }
    );
  });
}
