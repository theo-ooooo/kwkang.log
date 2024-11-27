"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export default function Header() {
  return (
    <div className='flex justify-between  p-3 max-w-[768px] sticky mx-auto top-0 bg-white dark:bg-black'>
      <Link href={"/"} className='font-bold text-lg underline'>
        <Image src={"/images/logo.png"} width={38} height={38} alt='logo' />
      </Link>
      <ThemeToggle />
    </div>
  );
}
