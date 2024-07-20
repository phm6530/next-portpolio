import type { Metadata } from "next";
import GlobalNav from "@/app/_components/globalNav/GlobalNav";
import ProviderContext from "@/app/_provider";
import "@/styles/_styles.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body">
        <ProviderContext>
          <GlobalNav />
          <main className="container">{children}</main>
        </ProviderContext>
      </body>
    </html>
  );
}
