import LoginForm from "@/app/auth/login/_component/LoginForm";
import classes from "./page.module.scss";
import Link from "next/link";
import { ERROR_CODE, MSG } from "@/codeMsg";

const Login = async ({
  searchParams,
}: {
  searchParams: { redirect: string; code: ERROR_CODE };
}) => {
  const { code } = searchParams;
  const msg = (code: keyof typeof MSG) => {
    return MSG[code] || "Error";
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.titleWrapper}>
        <h1>PROJECT. D</h1>
        <div className={classes.loginText}>프로젝트 로그인</div>
        {/* <p className={classes.signupDescription}>30초만 회원가입이 가능해요!</p> */}
      </div>
      {code &&
      <div className={classes.codeMsgContainer}>
        <p> {msg(ERROR_CODE[code])}</p>
      
      </div>
      }
      
      <LoginForm />  
     
      <div className={classes.authLinks}>
        copyRight @ PHM
      </div>
 
    </div>
  );
};

export default Login;
