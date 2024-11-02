import Footer from "@/components/ui/Footer";
import ProviderContext from "@/app/_provider";
import "@/styles/_styles.scss";
import { Metadata } from "next";
import Header from "@/components/Header/Header";
import GlobalNav from "@/components/Header/GlobalNav";
import { cookies } from "next/headers";
import { serverSession } from "@/utils/serverSession";

//메타 데이터
export const metadata: Metadata = {
  title: "나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * 드릴링이 생기더라도 Cookie를 먼저 서버컴포넌트에서 받아 넘겨주는게 맞음
   */

  const token = serverSession();

  return (
    <html lang="en">
      <body className="body" suppressHydrationWarning>
        <div id="backdrop-portal"></div>
        <div id="modal-portal"></div>

        <ProviderContext>
          <GlobalNav token={token || null} />
          <main className="container">{children}</main>
        </ProviderContext>

        <Footer />
      </body>
    </html>
  );
}
