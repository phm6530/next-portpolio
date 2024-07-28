import { useEffect, useState } from "react";

const useDeboune = (value: string, delay: number) => {
  const [debouneInput, setDeboundInput] = useState<string>(value);

  useEffect(() => {
    const tl = setTimeout(() => {
      setDeboundInput(value);
    }, delay);

    return () => {
      clearTimeout(tl);
    };
  }, [value, delay]);

  return debouneInput;
};

export default useDeboune;
