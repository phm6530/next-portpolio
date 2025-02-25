import { useRef } from "react";

// 쓰로틀링..
export default function useThrottling() {
  const ref = useRef<boolean>(false);

  const throttle = (cb: () => void, delay: number) => {
    if (ref.current) return;
    ref.current = true;

    cb();
    setTimeout(() => {
      ref.current = false;
    }, delay);
  };

  return { throttle };
}
