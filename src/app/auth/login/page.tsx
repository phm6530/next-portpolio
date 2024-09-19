import Grid from "@/components/ui/Grid";
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

  if (session?.user.role === "admin") {
    redirect(redirectPath || "/");
  }

  return (
    <Grid.extraSmall>
      <h1>로그인</h1>
      <LoginForm redirectPath={redirectPath} />
    </Grid.extraSmall>
  );
};

export default Login;
