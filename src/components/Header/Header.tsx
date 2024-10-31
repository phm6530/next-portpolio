import GlobalNav from "@/components/Header/GlobalNav";
import AutencitaionStore from "@/components/Header/components/AutencitaionStore";
import { serverSession } from "@/utils/serverSession";

export default function Header() {
  const token = serverSession();

  return (
    <>
      {/* Client 인증 전역 변수 설정 */}
      <AutencitaionStore token={!!token} />
      <GlobalNav token={!!token} />
    </>
  );
}
