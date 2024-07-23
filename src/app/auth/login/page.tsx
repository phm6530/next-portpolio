import LoginForm from "@/app/auth/login/_component/LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: {
    redirect: string;
  };
}) {
  const session = await auth();

  if (session) {
    console.log("세션들어오냐?");
    redirect("/");
  } else {
    console.log("세션 없음");
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm redirectPath={searchParams.redirect} />
    </div>
  );
}
