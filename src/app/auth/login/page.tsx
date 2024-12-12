import LoginForm from "@/app/auth/login/_component/LoginForm";
import classes from "./page.module.scss";

import Logo from "@/components/logo/logo";
import LoginMsg from "./LoginMsg";
import { ERROR_CODE } from "@/codeMsg";

const Login = async ({ searchParams, }: {
  searchParams: { redirect: string; code: ERROR_CODE };
}) => {
  const { code } = searchParams;

  return (
    <div className={classes.loginContainer}>
      <div className={classes.titleWrapper}>
        <Logo/>
        <div className={classes.loginText}>Do poll, 설문으로 소통하는 공간</div>
        {/* <p className={classes.signupDescription}>30초만 회원가입이 가능해요!</p> */}
      </div>
      {code && <LoginMsg code={code}/> }
      
      <LoginForm />  
     
      {/* <div className={classes.authLinks}>
        copyRight @ PHM
      </div> */}
 
    </div>
  );
};

export default Login;
