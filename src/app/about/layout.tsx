import { ReactNode } from "react";
import { BASE_URL } from "@/config/base";

export default async function layout({ children }: { children: ReactNode }) {
  await fetch(`${BASE_URL}/api/test`, {
    headers: {
      "x-id": "request_2",
    },
    next: {
      tags: ["hitme!"],
    },
  });

  return <>{children}</>;
}
