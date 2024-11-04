"use client";
import { BASE_NEST_URL } from "@/config/base";
import useStore from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function UserLoader() {
  const store = useStore();

  const { data } = useQuery({
    queryKey: ["USERDATA"],
    queryFn: async () => {
      const response = await fetch(`${BASE_NEST_URL}/user/me`, {
        credentials: "include",
      });
      return await response.json();
    },
  });
  useEffect(() => {
    store.setAuthUser({ ...data });
  }, [data]);

  return <></>;
}
