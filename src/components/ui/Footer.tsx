import Grid from "@/components/ui/Grid";
import classes from "./Footer.module.scss";
import Logo from "../logo/logo";

export default function Footer() {
  return (
    <div className={classes.footerContainer}>
      <footer className={classes.footer}>
        <Grid.center>
          <div className={classes.logoWrapper}>
            <Logo />
          </div>
          <p style={{ opacity: ".5" }}>squirrel309@naver.com</p>

          <p>
            이미지 저작권은 유료 프리픽을 라이센스를 사용중이며, 게시물은 상업적
            목적이 아닌 포트폴리오 목적으로만 사용됩니다. <br></br>아직 공개되지
            않은 작업물은 포함하지 않으며, 오직 공개된 작업물만을 게시합니다.
          </p>
          <br></br>
          <p>Copyright ⓒ p. Hyun</p>
        </Grid.center>
      </footer>
    </div>
  );
}
