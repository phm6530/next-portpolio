import GlobalNav from "@/components/Header/GlobalNav";
import AutencitaionStore from "@/components/Header/components/AutencitaionStore";
import { BASE_NEST_URL } from "@/config/base";
import { User } from "@/types/auth.type";
import { cookies } from "next/headers";
import { Suspense } from "react";
import fetchWithAuth from "@/utils/withRefreshToken";

export default async function Header() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  return <></>;
}
