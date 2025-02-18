"use client";
import { createContext, ReactNode, useState } from "react";

// Image Upload Render
export const ImgUploadContext = createContext<{
  isPending: boolean;
  setIsPending: (e: boolean) => void;
}>({
  isPending: false,
  setIsPending: () => {},
});

export function ImgUploadProvider({ children }: { children: ReactNode }) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const pendingClose = (e: boolean) => {
    setIsPending(e);
  };

  return (
    <ImgUploadContext.Provider
      value={{
        isPending,
        setIsPending: pendingClose,
      }}
    >
      {children}
    </ImgUploadContext.Provider>
  );
}
