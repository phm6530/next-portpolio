import LoginForm from "./components/login-form";
import Logo from "@/components/logo/logo";
import { ERROR_CODE } from "@/codeMsg";
import RefreshQueryClient from "../_component/RefreshQueryClient";
import MessageAlert from "@/components/shared/alerts/msg-alert";

const Login = async ({
  searchParams,
}: {
  searchParams: { redirect: string; code: ERROR_CODE };
}) => {
  const { code } = searchParams;

  return (
    <div className="flex flex-col justify-center h-calc-screen">
      <RefreshQueryClient code={code} />

      <div className="flex flex-col gap-5 items-center pb-4 ">
        <Logo />

        <div className="text-center opacity-50 text-base pb-6">
          Do poll, 설문으로 소통하는 공간
        </div>
      </div>
      {code && (
        <div className="pb-4">
          <MessageAlert code={code} />
        </div>
      )}

      {/* Login */}
      <LoginForm />
    </div>
  );
};

export default Login;
