import classes from "./formRegisterError.module.scss";

export default function FormRegisterError({ errorMsg }: { errorMsg: string }) {
  return <div className={classes.errorMsg}>{errorMsg}</div>;
}
