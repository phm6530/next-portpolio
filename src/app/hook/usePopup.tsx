import BackDrop from "@/components/modal/BackDrop";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./usePopup.module.scss";

const usePopup = () => {
  const [view, setView] = useState<boolean>(false);

  const PopupRender = ({
    className,
    children,
  }: {
    className?: string;
    children: ReactNode;
  }) => {
    if (!view) return null;
    return (
      <>
        {createPortal(
          <div
            className={`${classes.modalWrap} ${
              className ? className : undefined
            }`}
          >
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

  return { setView, PopupRender };
};

export default usePopup;
