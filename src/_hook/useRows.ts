import { ChangeEvent, useState } from "react";

// 3줄 기본값임
const minRows = 3;
const useRows = (): [number, (e: ChangeEvent<HTMLTextAreaElement>) => void] => {
  const [rows, setRows] = useState<number>(minRows);

  const rowsHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const newLineCount = Math.max(value.split("\n").length, minRows);
    setRows(newLineCount);
  };

  return [rows, rowsHandler];
};

export default useRows;
