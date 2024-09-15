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
    <Grid.center>
      <LoginForm redirectPath={redirectPath} />
    </Grid.center>
  );
};

export default Login;
