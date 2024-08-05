import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

export default function usePreview() {
  const [view, setView] = useState<boolean>(false);

  const RenderPreview = ({ children }: { children: ReactNode }) => {
    if (!view) return;

    return createPortal(
      <>
        {children}
        <button onClick={() => setView(false)}>닫기</button>
      </>,
      document.getElementById("modal-portal") as HTMLDivElement
    );
  };

  return {
    setView,
    RenderPreview,
  };
}
