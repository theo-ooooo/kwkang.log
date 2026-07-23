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
        {/* 로고 + 사이트명 */}
        <Link href='/' className='flex shrink-0 items-center gap-2'>
          <Image src='/images/logo.png' width={26} height={26} alt='logo' />
          <span className='text-base font-extrabold tracking-tight text-gray-900 dark:text-white'>
            kwkang<span className='text-indigo-600 dark:text-indigo-400'>.log</span>
          </span>
        </Link>

        {/* 스크롤 시 나타나는 글 제목 (중앙) */}
        <span
          className={clsx(
            "pointer-events-none absolute left-1/2 max-w-[42%] -translate-x-1/2 truncate text-sm font-semibold text-gray-700 transition-opacity dark:text-gray-200",
            {
              "opacity-0": !isShow,
              "opacity-100": isShow,
            }
          )}
        >
          {title}
        </span>

        {/* 네비 */}
        <nav className='flex shrink-0 items-center gap-1'>
          <Link
            href='/profile'
            className='rounded-full px-3 py-1.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
          >
            소개
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
