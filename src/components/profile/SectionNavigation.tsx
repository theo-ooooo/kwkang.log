"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "소개" },
  { id: "career", label: "경력" },
  { id: "skills", label: "기술" },
  { id: "projects", label: "프로젝트" },
  { id: "education", label: "학력" },
  { id: "contact", label: "연락처" },
];

export default function SectionNavigation() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      const offset = window.matchMedia("(max-width: 760px)").matches ? 130 : 140;
      let current = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <nav className="profile-navigation" aria-label="프로필 목차">
      <span className="eyebrow">PROFILE INDEX</span>
      <ul>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
