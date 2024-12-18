"use client";
import Grid from "@/components/ui/Grid";
import { useRouter } from "next/navigation";
import classes from "./not-found.module.scss";
import Button from "@/components/ui/button/Button";
import NotFoundIcon from "/public/asset/utils/notfound.svg";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.replace("/");
  };

  return (
    <Grid.smallCenter>
      <div className={classes.notFoundContainer}>
        <h1>404 Error!</h1>
        <div className={classes.iconWrapper}>
          <NotFoundIcon />
        </div>
        <h3>잘못된 경로이거나 서버오류 입니다.</h3>

        <div className={classes.buttonWrapper}>
          <Button.outlineButton onClick={handleHome}>Home</Button.outlineButton>
          <Button.outlineButton onClick={handleBack}>
            뒤로가기
          </Button.outlineButton>
        </div>
      </div>
    </Grid.smallCenter>
  );
}
