import SubheaderDescrition from "@/components/ui/subheader-description";
import SignUpForm from "./components/signup-form";

export default function SignUp() {
  return (
    <>
      <SubheaderDescrition
        title={`회원가입`}
        description="인증하지 않고 바로 가입이 가능해요!"
      />
      <SignUpForm />
    </>
  );
}
