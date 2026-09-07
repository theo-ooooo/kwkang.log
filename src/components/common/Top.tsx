"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function TopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      className="icon-button top-button"
      aria-label="맨 위로 이동"
      onClick={() => window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      })}
    >
      <FiArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
