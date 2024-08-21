import LoginForm from "@/app/auth/login/_component/LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Login = async ({
  searchParams,
  req,
}: {
  searchParams: { redirect: string };
  req: any;
}) => {
  const { redirect: redirectPath } = searchParams;
  const session = await auth();

  console.log(redirectPath);

  if (session?.user.role === "admin") {
    redirect(redirectPath || "/");
  }

  return (
    <>
      <LoginForm redirectPath={redirectPath} />
    </>
  );
};

export default Login;
