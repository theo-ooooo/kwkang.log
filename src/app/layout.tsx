import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import TopButton from "@/components/common/Top";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import profile from "@/data/profile.json";
import { DOMAIN_URL } from "@/constants/common";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: {
    template: "%s | kwkang.log",
    default: `${profile.name} — ${profile.role} | kwkang.log`,
  },
  description: "풀스택 개발자 강경원의 소개, 경력과 프로젝트. 기술 기록은 백틱에서 만나요.",
  other: {
    ["naver-site-verification"]: "4aa506f808f61858b1492263f589d1148039bbfb",
  },
  openGraph: {
    title: `${profile.name} — ${profile.role} | kwkang.log`,
    description: "풀스택 개발자 강경원의 소개, 경력과 프로젝트",
    url: "https://kwkang.net",
    siteName: "kwkang.log",
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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">본문으로 건너뛰기</a>
          <div className="site-frame">
            <Header githubUrl={profile.links.github} />
            <main id="main-content" className="site-main site-container" tabIndex={-1}>{children}</main>
            <Footer />
          </div>
          <TopButton />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        {modal}
        <div id='modal-root'></div>
      </body>
    </html>
  );
}
