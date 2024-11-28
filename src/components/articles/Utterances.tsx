"use client";

import { Theme } from "@/constants/common";
import useTheme from "@/hooks/useTheme";
import { useEffect, useRef } from "react";

export default function Utterances() {
  const ref = useRef<HTMLDivElement>(null);
  const initRef = useRef<boolean>(false);
  const { theme } = useTheme();

  const utterancesDark = "github-dark";
  const utterancesLight = "github-light";

  const utterancesTheme =
    theme === Theme.dark ? utterancesDark : utterancesLight;

  useEffect(() => {
    if (!ref.current || initRef.current) return;

    initRef.current = true;

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

    ref.current.appendChild(script);
  }, [utterancesTheme]);

  useEffect(() => {
    const utterancesIframe = document.querySelector<HTMLIFrameElement>(
      "iframe.utterances-frame"
    );

    if (!utterancesIframe) return;
    utterancesIframe.contentWindow?.postMessage(
      {
        type: "set-theme",
        theme: utterancesTheme,
      },
      "https://utteranc.es"
    );
  }, [utterancesTheme]);

  return <div ref={ref}></div>;
}
