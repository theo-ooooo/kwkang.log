"use client";

import { useHeaderTitleStore } from "@/stores/headerTitle";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export default function Header() {
  const { title } = useHeaderTitleStore();
  return (
    <div className='flex justify-between items-center p-3 max-w-[768px] sticky mx-auto top-0 bg-white dark:bg-black'>
      <Link href={"/"} className='font-bold text-lg underline'>
        <Image src={"/images/logo.png"} width={38} height={38} alt='logo' />
      </Link>
      <span className='font-bold text-base line-clamp-2 text-center px-2'>
        {title}
      </span>
      <ThemeToggle />
    </div>
  );
}
