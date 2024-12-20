import HeaderTitle from "@/app/(template-made)/components/Header/HeaderTitle";
import SignUpForm from "@/app/auth/signup/_component/SignUpForm";

export default function SignUp() {
  return (
    <>
      <HeaderTitle
        title={`회원가입`}
        description="인증하지 않고 바로 가입이 가능해요!"
      />
      <SignUpForm />
    </>
  );
}
