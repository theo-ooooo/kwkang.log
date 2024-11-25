import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <main className='flex max-w-[768px] mx-auto px-2'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
