import GlobalNav from "@/app/_components/globalNav/GlobalNav";
import ProviderContext from "@/app/_provider";
import { auth } from "@/auth";
import PageTransition from "@/app/lib/PageTransition";

import "@/styles/_styles.scss";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auths = await auth();

  return (
    <html lang="en">
      <body className="body">
        <ProviderContext>
          <GlobalNav isLogin={!!auths} />
          <main className="container">{children}</main>
        </ProviderContext>
      </body>
    </html>
  );
}
