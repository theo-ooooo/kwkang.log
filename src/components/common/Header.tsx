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
    <div className='flex justify-between items-center p-3 max-w-[768px] sticky mx-auto top-0 bg-white dark:bg-black'>
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
      <ThemeToggle />
    </div>
  );
}
