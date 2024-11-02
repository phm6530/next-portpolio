import LoginForm from "@/app/auth/login/_component/LoginForm";
import classes from "./page.module.scss";
import Link from "next/link";
import { redirect } from "next/navigation";
import { serverSession } from "@/utils/serverSession";

const Login = async ({
  searchParams,
}: {
  searchParams: { redirect: string };
}) => {
  const { redirect: redirectPath } = searchParams;
  const token = serverSession();

  if (token) {
    redirect(redirectPath);
  }

  return (
    <>
      <h1>로그인</h1>
      <LoginForm redirectPath={redirectPath} />
      <div className={classes.authLinks}>
        <Link href={"/auth/signup"}>회원가입</Link>|{" "}
        <Link href={""}>비밀번호 찾기</Link>
      </div>
    </>
  );
};

export default Login;
