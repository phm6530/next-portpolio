import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test`, {
    headers: {
      "x-id": "request_2",
    },
    next: {
      tags: ["hitme!"],
    },
  });

  return <>{children}</>;
}
