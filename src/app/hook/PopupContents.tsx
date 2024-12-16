import React, { ReactNode } from "react";
import classes from "./PopupContents.module.scss";
import { createPortal } from "react-dom";
import BackDrop from "@/components/modal/BackDrop";

type PopupComponentProps = {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  children: ReactNode;
};

export const PopupComponent: React.FC<PopupComponentProps> = React.memo(
  ({ isOpen, closeModal, className, children }) => {
    if (!isOpen) return null;
    console.log("랜더?");
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
              <div className={classes.closeBtnWrapper}>
                <button
                  onClick={() => {
                    closeModal();
                  }}
                >
                  닫기
                </button>
              </div>
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
  }
);

/**
 * 새로운 컴포넌트 객체를 생성하여 반환하지만, 원본의 컴포넌트 이름은 받지않음
 * 그래서 display name을 적어줘야함
 */
PopupComponent.displayName = "PopupComponent";
