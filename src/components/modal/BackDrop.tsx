"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./BackDrop.module.scss";

export default function BackDrop({
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
        <div className={classes.backDropStyle} {...rest} onClick={onClick}>
          test
        </div>,
        document.getElementById("backdrop-portal") as HTMLDivElement
      )}
    </>
  );
}
