import LoginForm from "@/app/auth/login/_component/LoginForm";
import classes from "./page.module.scss";
import Link from "next/link";
import { redirect } from "next/navigation";
import { serverSession } from "@/utils/serverSession";
import { ERROR_CODE, MSG } from "@/codeMsg";

const Login = async ({
  searchParams,
}: {
  searchParams: { redirect: string; code: ERROR_CODE };
}) => {
  const { redirect: redirectPath, code } = searchParams;
  const token = serverSession();

  if (token) {
    redirect(redirectPath || "/list");
  }

  const msg = (code: keyof typeof MSG) => {
    return MSG[code] || "Error";
  };

  return (
    <>
      <h1>로그인</h1>
      <LoginForm />
      <p>{code && msg(ERROR_CODE[code])}</p>
      <div className={classes.authLinks}>
        <Link href={"/auth/signup"}>회원가입</Link>|{" "}
        <Link href={""}>비밀번호 찾기</Link>
      </div>
      <p>별도의 인증없이 회원가입 가능합니다.</p>
    </>
  );
};

export default Login;
