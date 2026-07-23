"use client";

import { useHeaderTitleStore } from "@/stores/headerTitle";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export default function Header() {
  const { title, isShow } = useHeaderTitleStore();

  return (
    <header className='sticky top-0 z-50 border-b border-gray-100 bg-white/70 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/70'>
      <div className='relative mx-auto flex h-14 max-w-[768px] items-center justify-between px-4'>
        {/* 로고 (홈) */}
        <Link href='/' className='flex shrink-0 items-center' aria-label='home'>
          <Image src='/images/logo.png' width={28} height={28} alt='logo' />
        </Link>

        {/* 스크롤 시 나타나는 글 제목 (중앙) */}
        <span
          className={clsx(
            "pointer-events-none absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate text-sm font-semibold text-gray-700 transition-opacity dark:text-gray-200",
            {
              "opacity-0": !isShow,
              "opacity-100": isShow,
            }
          )}
        >
          {title}
        </span>

        {/* 테마 토글 */}
        <ThemeToggle />
      </div>
    </header>
  );
}
