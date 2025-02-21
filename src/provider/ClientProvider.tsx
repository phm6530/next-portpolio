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
        defaultTheme="light"
        enableColorScheme={false}
      >
        {children}
      </ThemeProvider>
    </RQProvider>
  );
}
