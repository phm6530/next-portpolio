import GlobalNav from "@/components/globalNav/GlobalNav";
import Footer from "@/components/ui/Footer";
import ProviderContext from "@/app/_provider";

import "@/styles/_styles.scss";

import { Metadata } from "next";
import { Suspense } from "react";

//메타 데이터
export const metadata: Metadata = {
  title: "나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body" suppressHydrationWarning>
        <div id="backdrop-portal"></div>
        <div id="modal-portal"></div>
        <ProviderContext>
          <Suspense fallback={<div>loading...</div>}>
            <GlobalNav />
            <main className="container">{children}</main>
          </Suspense>
        </ProviderContext>
        <Footer />
      </body>
    </html>
  );
}
