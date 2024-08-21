import PinPage from "@/app/auth/pin/_component/PinPage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: { redirect: string };
}) => {
  const { redirect: redirectPath } = searchParams;
  const session = await auth();

  const redirectArr = searchParams.redirect.split("/");
  const template_key = redirectArr[redirectArr.length - 1];

  if (session && template_key === session.user.template_key) {
    redirect(redirectPath || "/");
  }

  return (
    <>
      <PinPage template_key={template_key} redirectPath={redirectPath} />
    </>
  );
};

export default Page;
