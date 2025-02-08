import { useEffect, useState } from "react";

type ResponseView = "min-width" | "max-width";
type ResponseQueryString = `(${ResponseView}:${number}px)`;

//Tailwind 쓸꺼니까 min 기준으로 할거임
export default function useMediaQuery(query: ResponseQueryString) {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = matchMedia(query); // 문자열로 된 미디어 쿼리를 전달

    function onChange(e: MediaQueryListEvent) {
      setValue(e.matches);
    }

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
