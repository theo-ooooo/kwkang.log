"use client";

import { useHeaderTitleStore } from "@/stores/headerTitle";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export default function Header() {
  const { title, isShow } = useHeaderTitleStore();
  return (
    <div className='flex justify-between items-center p-4 max-w-[768px] sticky mx-auto top-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50'>
      <Link href={"/"} className='font-bold text-lg underline'>
        <Image src={"/images/logo.png"} width={38} height={38} alt='logo' />
      </Link>
      <span
        className={clsx(
          "font-bold text-base line-clamp-2 text-center px-2 transition-opacity",
          {
            "opacity-0": !isShow,
            "opacity-100": isShow,
          }
        )}
      >
        {title}
      </span>
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Profile"
          title="Profile"
        >
          <FaUser size={20} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" />
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
