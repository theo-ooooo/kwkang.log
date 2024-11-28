"use client";

import { Theme } from "@/constants/common";
import useTheme from "@/hooks/useTheme";
import { useEffect, useRef } from "react";

export default function Utterances() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const utterancesDark = "github-dark";
  const utterancesLight = "github-light";

  const utterancesTheme =
    theme === Theme.dark ? utterancesDark : utterancesLight;

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const script = document.createElement("script");

    const config: Record<string, string> = {
      src: "https://utteranc.es/client.js",
      async: "true",
      crossOrigin: "anonymous",
      repo: "theo-ooooo/kwkang.log",
      branch: "main",
      "issue-term": "pathname",
      theme: utterancesTheme,
    };

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    console.log(script);

    ref.current.appendChild(script);
  }, [utterancesTheme]);

  return <div ref={ref}></div>;
}
