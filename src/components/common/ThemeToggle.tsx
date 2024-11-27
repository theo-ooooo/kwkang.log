"use client";

import { Theme } from "@/constants/common";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  const handleCilck = useCallback(() => {
    setTheme(theme === Theme.light ? Theme.dark : Theme.light);
  }, [theme, setTheme]);
  return (
    <button onClick={handleCilck}>
      {theme === Theme.light ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
