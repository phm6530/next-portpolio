import HeaderTitle from "@/app/(template-made)/components/Header/HeaderTitle";
import PasswordFindForm from "./_component/PasswordFindForm";

const Page = ({ searchParams }: { searchParams: { redirect: string } }) => {
  const { redirect: redirectPath } = searchParams;

  return (
    <>
      <HeaderTitle
        title={`비밀번호 찾기`}
        description="인증하지 않고 바로 가입이 가능해요!"
      />
      <PasswordFindForm />
      {/* <AccessEmailController /> */}
    </>
  );
};

export default Page;
