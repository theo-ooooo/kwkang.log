import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import TopButton from "@/components/common/Top";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    template: "%s | Theo.log",
    default: "Theo.log",
  },
  description: "Theo의 개발 블로그 입니다.",
  openGraph: {
    title: "Theo.log",
    description: "Theo의 개발 블로그 입니다.",
    url: "https://kwkang.net",
    siteName: "Theo.log",
    images: [
      {
        url: `/api/og`,
        width: 1200,
        height: 630,
        alt: "theo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className='dark:bg-black'>
        <ThemeProvider>
          <Header />
          <main className='flex max-w-[768px] mx-auto px-2'>{children}</main>
          <Footer />
          <TopButton />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
