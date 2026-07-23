"use client";

import useTheme from "@/hooks/useTheme";
import { Theme } from "@/constants/common";

import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, handleTheme } = useTheme();

  return (
    <button
      onClick={handleTheme}
      aria-label='테마 전환'
      className='flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
    >
      {theme === Theme.light ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
