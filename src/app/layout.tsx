import GlobalNav from "@/app/_components/globalNav/GlobalNav";
import Footer from "@/app/_components/ui/Footer";
import ProviderContext from "@/app/_provider";
import { auth } from "@/auth";

import "@/styles/_styles.scss";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auths = await auth();

  return (
    <html lang="en">
      <body className="body" suppressHydrationWarning>
        <div id="backdrop-portal"></div>
        <div id="modal-portal"></div>
        <ProviderContext>
          <GlobalNav isLogin={!!auths} />
          <main className="container">{children}</main>
          <Footer />
        </ProviderContext>
      </body>
    </html>
  );
}
