import { BASE_URL } from "@/config/base";
import requestHandler from "./withFetch";

async function withAuthFetch<T>(
  url: string,
  option: RequestInit = {}
) {
  return await requestHandler<T>(async () => {
    if (typeof window !== undefined) {
      //Client
      option = {
        ...option,
        credentials: "include",
      };
    }

    return await fetch(`${BASE_URL}/${url}`, option);
  });
}

export default withAuthFetch;
