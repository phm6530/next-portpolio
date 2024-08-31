import { revalidateTag } from "next/cache";
("use server");
export async function triggerRevalidation() {
  revalidateTag("hitme");
}
