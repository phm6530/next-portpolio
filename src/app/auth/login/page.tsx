import LoginForm from "@/app/auth/login/_component/LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Login = async ({
  searchParams,
}: {
  searchParams: { redirect: string };
}) => {
  const { redirect: redirectPath } = searchParams;
  const session = await auth();

  if (session) {
    redirect(redirectPath || "/");
  }

  return <LoginForm redirectPath={redirectPath} />;
};

export default Login;
