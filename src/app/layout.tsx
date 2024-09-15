import GlobalNav from "@/components/globalNav/GlobalNav";
import Footer from "@/components/ui/Footer";
import ProviderContext from "@/app/_provider";
import { auth } from "@/auth";

import "@/styles/_styles.scss";
import { commentMetadata } from "@/meta/staticMetaData";

//전역 Meta
export const metadata = commentMetadata;

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
