import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import ClientProvider from "@/provider/ClientProvider";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import toastConfig from "@/config/toast";
import "./globals.css";
import HeaderNav from "@/components/layout/Header/header-nav";
import ThemeToggleButton from "@/components/ui/thema-toggle-btn";
import { withFetchRevaildationAction } from "@/utils/with-fetch-revaildation";
import UserDataCaching from "@/provider/UserDataCaching";

//메타 데이터
export const metadata: Metadata = {
  title: "[Dopoll] 나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",

  openGraph: {
    title: "[Dopoll] 나만의 설문조사를 만들어보세요",
    description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
    images: "/asset/meta.jpg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  /**
   * 11/07
   * AccessToken이 SessionStorage로 관리되기 때문에 ,
   * 초기 진입시에 Refresh Token으로 AccessToken 생성해야함
   *
   */

  const queryClient = new QueryClient();

  if (!!token) {
    // 유저데이터 캐싱해서 사용하려고
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.USER_DATA],
      queryFn: async () => {
        const endPoint = `user/me`;
        const { result, success } = await withFetchRevaildationAction({
          endPoint,
          requireAuth: true,
          options: {
            cache: "no-store",
          },
        });

        if (!success) {
          throw new Error("erro");
        }

        return result;
      },
    });
  }

  return (
    // useTheme의다크모드 때문에 suppressHydration 해둠
    <html lang="en" suppressHydrationWarning>
      <body className="body">
        <div id="modal-portal"></div>
        <div id="backdrop-portal"></div>

        <ClientProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            {!!token && <UserDataCaching />}

            {/* Global */}
            <HeaderNav />
            <ToastContainer {...toastConfig} />

            <main className=" mt-[60px]">{children}</main>
            {/* Dark Mode handler */}
            <ThemeToggleButton />
          </HydrationBoundary>
        </ClientProvider>

        <Footer />
      </body>
    </html>
  );
}
