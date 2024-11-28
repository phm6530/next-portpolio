import { useCallback, useState } from "react";
import { PopupComponent } from "@/app/hook/PopupContents";

const usePopup = () => {
  const [view, setView] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setView(true);
  }, []);

  const closeModal = useCallback(() => {
    setView(false);
  }, []);

  return { isOpen: view, openModal, closeModal, PopupComponent };
};

export default usePopup;
