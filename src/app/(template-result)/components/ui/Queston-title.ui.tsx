import Image from "next/image";
import classes from "./Question-title.module.scss";
// import ChkIcon from "/public/asset/icon/chkCircle.png";

export default function QuestionTitle({ children }: { children: string }) {
  return (
    <>
      <div className={classes.label}>
        {/* <Image src={ChkIcon} alt={"title"} width={30} /> {children} */}
      </div>
    </>
  );
}
