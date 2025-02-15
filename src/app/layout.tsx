import Footer from "@/components/layout/Footer";
import ProviderContext from "@/app/_provider";
import "@/styles/_styles.scss";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import ClientProvider from "@/provider/ClientProvider";
import ModeToggle from "@/components/ModeToggle/ModeToggle";

import withAuthFetch from "@/utils/withAuthFetch";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import toastConfig from "@/config/toast";
import "./globals.css";
import HeaderNav from "@/components/layout/Header/header-nav";

//메타 데이터
export const metadata: Metadata = {
  title: "[Dopoll] 나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  /**
   * 11/07
   * AccessToken이 SessionStorage로 관리되기 때문에 ,
   * 초기 진입시에 Refresh Token으로 AccessToken 생성해야함
   *
   */

  if (token) {
    // 유저데이터 캐싱해서 사용
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.USER_DATA],
      queryFn: async () => {
        const endpoint = `user/me`;
        const option: RequestInit = {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        return await withAuthFetch<any>(endpoint, option);
      },
    });
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="body">
        <div id="backdrop-portal"></div>
        <div id="modal-portal"></div>

        <ProviderContext>
          <ClientProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
              {/* Global */}
              <HeaderNav />
              <ToastContainer {...toastConfig} />

              <main className=" mt-[60px]">{children}</main>
              {/* Dark Mode handler */}
              <ModeToggle />
            </HydrationBoundary>
          </ClientProvider>
        </ProviderContext>

        <Footer />
      </body>
    </html>
  );
}
