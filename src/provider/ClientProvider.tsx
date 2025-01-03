"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      enableSystem={false}
      defaultTheme="light"
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  );
}
