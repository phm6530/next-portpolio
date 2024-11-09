import BackDrop from "@/components/modal/BackDrop";
import { ReactNode, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./usePopup.module.scss";

const usePopup = () => {
  const [view, setView] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setView(true);
  }, []);

  const closeModal = useCallback(() => {
    setView(false);
  }, []);

  const PopupRender = useCallback(
    ({
      closeSideEffect,
      className,
      children,
    }: {
      closeSideEffect?: () => void;
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
                <button
                  onClick={() => {
                    closeModal();
                    console.log("closeSideEffect 실행"); // 확인용 로그
                  }}
                >
                  닫기
                </button>
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
    },
    [view, closeModal]
  ); // view와 closeModal이 변경될 때에만 재생성

  return { openModal, closeModal, PopupRender };
};

export default usePopup;
