"use client";

import { useSession } from "next-auth/react";

export default function ClientTest() {
  const { data: session } = useSession();
  console.log(session);
  return <>check</>;
}
