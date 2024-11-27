"use client";

import useTheme from "@/hooks/useTheme";
import { Theme } from "@/constants/common";

import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, handleTheme } = useTheme();

  return (
    <button onClick={handleTheme}>
      {theme === Theme.light ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
