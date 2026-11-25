"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiMail, FiEdit3 } from "react-icons/fi";

const ThemeToggle = dynamic(() => import("@/components/common/ThemeToggle"), {
  ssr: false,
  loading: () => <span className="theme-placeholder" aria-hidden="true" />,
});

export const SECTIONS = [
  { id: "home", label: "처음" },
  { id: "about", label: "소개" },
  { id: "experience", label: "경력" },
  { id: "skills", label: "기술" },
  { id: "projects", label: "만든 것" },
  { id: "contact", label: "연락" },
] as const;

type Props = {
  name: string;
  role: string;
  imageSrc: string;
  github: string;
  email: string;
  blog: string;
  now: string;
};

export default function Sidebar({ name, role, imageSrc, github, email, blog, now }: Props) {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    // 마지막 섹션은 짧아서 화면 가운데에 못 온다. 바닥에 닿으면 연락으로
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <aside className="pf-side" aria-label="프로필과 메뉴">
      <div className="pf-side-card">
        <div className="pf-side-id">
          <Image src={imageSrc} alt="" width={56} height={56} className="pf-side-photo" priority />
          <div>
            <p className="pf-side-name">{name}</p>
            <p className="pf-side-role">{role}</p>
          </div>
        </div>
        <nav className="pf-side-nav" aria-label="섹션">
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>{label}</a>
          ))}
          <Link href="/profile" className="pf-side-resume">이력서</Link>
        </nav>
        <p className="pf-side-now"><span>지금</span>{now}</p>
        <div className="pf-side-links">
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub aria-hidden="true" /></a>
          <a href={blog} target="_blank" rel="noopener noreferrer" aria-label="백틱 블로그"><FiEdit3 aria-hidden="true" /></a>
          <a href={`mailto:${email}`} aria-label="메일 보내기"><FiMail aria-hidden="true" /></a>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
