import LoginForm from "@/app/auth/login/_component/LoginForm";

const Login = ({ searchParams }: { searchParams: { redirect: string } }) => {
  const { redirect } = searchParams;
  return <LoginForm redirectPath={redirect} />;
};

export default Login;
