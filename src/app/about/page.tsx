import Grid from "@/components/ui/Grid";
import { revalidateTag } from "next/cache";
import { BASE_URL } from "@/config/base";

export default async function AboutPage() {
  async function serverAction() {
    "use server";
    revalidateTag("hitme");
  }

  await fetch(`${BASE_URL}/api/test`, {
    headers: {
      "x-id": "request_1",
    },
    next: {
      tags: ["hitme"],
    },
  });

  return (
    <Grid.center>
      <form action={serverAction}>
        <button type="submit">재 요청</button>
      </form>
    </Grid.center>
  );
}
