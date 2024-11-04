import Footer from "@/components/ui/Footer";
import ProviderContext from "@/app/_provider";
import "@/styles/_styles.scss";
import { Metadata } from "next";
import GlobalNav from "@/components/Header/GlobalNav";
import { cookies } from "next/headers";
import { serverSession } from "@/utils/serverSession";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BASE_NEST_URL } from "@/config/base";
import fetchWithAuth from "@/utils/withRefreshToken";
import { QUERY_KEY } from "@/types/constans";

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
  const token = serverSession();
  const queryClient = new QueryClient();

  //세션이기때문에 refresh 보내야함
  if (token) {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.USER_DATA],
      queryFn: async () => {
        const endpoint = `${BASE_NEST_URL}/user/me`;
        const option: RequestInit = {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
          credentials: "include",
        };
        return await fetchWithAuth(endpoint, option);
      },
    });
  }

  return (
    <html lang="en">
      <body className="body" suppressHydrationWarning>
        <div id="backdrop-portal"></div>
        <div id="modal-portal"></div>

        <ProviderContext>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <GlobalNav token={token || null} />
            <main className="container">{children}</main>
          </HydrationBoundary>
        </ProviderContext>

        <Footer />
      </body>
    </html>
  );
}
