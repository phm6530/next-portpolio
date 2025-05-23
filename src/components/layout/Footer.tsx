import LogoWrapper from "../ui/logo-wrapper";
import Grid from "../ui/Grid";

export default function Footer() {
  return (
    <div className="mt-5 py-12">
      {" "}
      <Grid.smallCenter className="min-h-0">
        <footer className="py-8 border-t flex flex-col gap-4 text-centers items-center">
          <LogoWrapper maxWidth={100} />

          <p className="text-[12px] leading-6 opacity-80 text-center">
            이미지 저작권은 유료 프리픽을 라이센스를 사용중이며, 게시물은 상업적
            목적이 아닌 포트폴리오 목적으로만 사용됩니다. <br></br>아직 공개되지
            않은 작업물은 포함하지 않으며, 오직 공개된 작업물만을 게시합니다.
          </p>
          <br></br>
          <p className="text-sm text-muted-foreground">Copyright ⓒ p. Hyun</p>
        </footer>
      </Grid.smallCenter>
    </div>
  );
}
