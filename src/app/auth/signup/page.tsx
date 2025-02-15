import SecondaryMessageBox from "@/app/(protected-page)/(template-made)/components/Header/SecondaryMessageBox";
import SignUpForm from "./components/signup-form";

export default function SignUp() {
  return (
    <>
      <SecondaryMessageBox
        title={`회원가입`}
        description="인증하지 않고 바로 가입이 가능해요!"
      />
      <SignUpForm />
    </>
  );
}
