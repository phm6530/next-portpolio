import { BASE_NEXT_API } from "@/config/base";
import { withFetch } from "@/util/clientUtil";

const revaildateTags = async ({ tags }: { tags: string[] }) => {
  await withFetch(async () => {
    return await fetch(`${BASE_NEXT_API}/revalidatetags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: [...tags],
      }),
    });
  });
};

export default revaildateTags;
