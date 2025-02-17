import { BASE_NEST_URL } from "@/config/base";
import { cookies } from "next/headers";

type TrackingCookieName = `${string}_${string}_${string}`;

export default async function ViewCount({
  cookieName,
}: {
  cookieName: TrackingCookieName;
}) {
  const cookieStore = cookies();

  const [_, category, id] = cookieName.split("_");
  const existingCookie = cookieStore.get(`board_${category}_${id}`);

  // 쿠키를 헤더에 포함시켜 요청
  const response = await fetch(
    `${BASE_NEST_URL}/board/view/${category}/${id}`,
    {
      headers: {
        Cookie: existingCookie
          ? `${existingCookie.name}=${existingCookie.value}`
          : "",
      },
    }
  );

  const result = await response.json();

  return (
    <div className="py-8 border-t border-b border-muted-foreground/30 my-3">
      조회수 {result.count}
    </div>
  );
}
