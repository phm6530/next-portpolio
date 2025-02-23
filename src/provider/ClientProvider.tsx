"use client";
import RQProvider from "@/config/RQ_Provider";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <RQProvider>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="dark"
        enableColorScheme={false}
      >
        {children}
      </ThemeProvider>
    </RQProvider>
  );
}
