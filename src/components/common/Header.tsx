"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <span className="theme-placeholder" aria-hidden="true" />,
});

export default function Header({ githubUrl }: { githubUrl: string }) {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="wordmark" aria-label="kwkang.log 홈">kwkang<span>.</span>log</Link>
        <nav className="header-nav" aria-label="주 메뉴">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>홈</Link>
          <Link href="/profile" aria-current={pathname === "/profile" ? "page" : undefined}>프로필</Link>
          <a className="header-github" href={githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
