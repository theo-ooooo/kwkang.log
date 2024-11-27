"use client";

import { Theme } from "@/constants/common";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider defaultTheme={Theme.system} attribute={"class"}>
      {children}
    </NextThemeProvider>
  );
}
