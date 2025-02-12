import MyContents from "@/app/(protected-page)/mypage/_components/MyContents";
import Myprofile from "@/app/(protected-page)/mypage/_components/Myprofile";

export default async function page() {
  return (
    <div className="flex flex-col gap-8 py-12">
      <Myprofile />
      <MyContents />
    </div>
  );
}
