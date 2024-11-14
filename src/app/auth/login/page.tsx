import LoginForm from "@/app/auth/login/_component/LoginForm";
import classes from "./page.module.scss";
import Link from "next/link";
import { redirect } from "next/navigation";
import { serverSession } from "@/utils/serverSession";
import { ERROR_CODE, MSG } from "@/codeMsg";

const Login = async ({
  searchParams,
}: {
  searchParams: { redirect: string; code: string };
}) => {
  const { redirect: redirectPath, code } = searchParams;
  const token = serverSession();

  if (token) {
    redirect(redirectPath || "/list");
  }

  const msg = (code: keyof typeof MSG) => {
    return MSG[code] || "Error";
  };

  console.log(code);

  return (
    <>
      <h1>로그인</h1>
      <LoginForm />
      <p>{code && msg(code as ERROR_CODE)}</p>
      <div className={classes.authLinks}>
        <Link href={"/auth/signup"}>회원가입</Link>|{" "}
        <Link href={""}>비밀번호 찾기</Link>
      </div>
    </>
  );
};

export default Login;
