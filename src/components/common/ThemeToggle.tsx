"use client";

import useTheme from "@/hooks/useTheme";
import { Theme } from "@/constants/common";

import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, handleTheme } = useTheme();

  return (
    <button
      onClick={handleTheme}
      type="button"
      aria-label={theme === Theme.light ? "다크 모드로 전환" : "라이트 모드로 전환"}
      title={theme === Theme.light ? "다크 모드로 전환" : "라이트 모드로 전환"}
      className="icon-button theme-toggle"
    >
      {theme === Theme.light ? <FiSun size={20} aria-hidden="true" /> : <FiMoon size={20} aria-hidden="true" />}
    </button>
  );
}
