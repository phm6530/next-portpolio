import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./usePreview.module.scss";
import BackDrop from "@/components/modal/BackDrop";

export default function usePreview() {
  const [view, setView] = useState<boolean>(false);

  const RenderPreview = ({ children }: { children: ReactNode }) => {
    // 팝업 on off
    if (!view) return;

    return (
      <>
        {createPortal(
          <div className={classes.modalWrap}>
            <div className={classes.modalContents}>
              {children}
              <button onClick={() => setView(false)}>닫기</button>
            </div>
          </div>,
          document.getElementById("modal-portal") as HTMLDivElement
        )}

        {createPortal(
          <BackDrop />,
          document.getElementById("backdrop-portal") as HTMLDivElement
        )}
      </>
    );
  };

  return {
    setView,
    RenderPreview,
  };
}
