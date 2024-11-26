import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import TopButton from "@/components/common/Top";

export const metadata: Metadata = {
  title: {
    template: "%s | Theo.log",
    default: '"Theo.log"',
  },
  description: "Theo의 개발 블로그 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <Header />
        <main className='flex max-w-[768px] mx-auto px-2'>{children}</main>
        <Footer />
        <TopButton />
      </body>
    </html>
  );
}
