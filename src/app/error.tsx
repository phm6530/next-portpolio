"use client";

import Grid from "@/components/ui/Grid";
import classes from "./error.module.scss";
import Button from "@/components/ui/button/Button";
import ErrorIcon from "/public/asset/utils/error.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false); // 로딩 상태 관리

  const handleReset = async () => {
    setIsPending(true);
    try {
      // 일부로 1초 걸어버리기
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Grid.smallCenter>
      <div className={classes.errorPageContainer}>
        <h1>Error!</h1>
        <div className={classes.iconWrapper}>
          <ErrorIcon />
        </div>
        <h3>요청이 잘못되었거나 서버에 문제가 있습니다.</h3>

        <div className={classes.buttonWrapper}>
          <Button.outlineButton onClick={() => router.replace("/")}>
            Home
          </Button.outlineButton>
          <Button.outlineButton onClick={handleReset} disabled={isPending}>
            {isPending ? "요청 중..." : "재 요청 하기"}
          </Button.outlineButton>
        </div>
      </div>
    </Grid.smallCenter>
  );
}
