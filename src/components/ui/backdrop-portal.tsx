"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function BackDropPortal({
  onClick,
  ...rest
}: {
  onClick: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {createPortal(
        <div
          className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/50 backdrop-blur-sm 
          animate-fadein"
          {...rest}
          onClick={onClick}
        />,
        document.getElementById("backdrop-portal") as HTMLDivElement
      )}
    </>
  );
}
