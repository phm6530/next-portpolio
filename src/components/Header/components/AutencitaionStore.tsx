"use client";
import useStore from "@/store/store";
import { User } from "@/types/auth.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AutencitaionStore({
  token,
  userData,
}: {
  token: boolean;
  userData?: User | null;
}) {
  const store = useStore();
  const { data } = useQuery({});
  const getUserData = async (token: string): Promise<User> => {
    const endpoint = `${BASE_NEST_URL}/user/me`;
    const option: RequestInit = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", //
    };

    return await fetchWithAuth(endpoint, option, token);
  };

  useEffect(() => {
    if (!token || !userData) return;
    store.setAuthUser({
      id: userData.id,
      nickname: userData.nickname,
      role: userData.role,
      email: userData.email,
    });
  }, [token]);

  return null;
}
