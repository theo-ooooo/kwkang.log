import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import profile from "@/data/profile.json";
import { BACKTICK_PROFILE_URL } from "@/constants/common";

export const metadata = {
  title: "강경원 — Backend Developer",
  description: "성능과 안정성으로 신뢰받는 백엔드 개발자 강경원. 프로필과 경력을 살펴보고, 기술 기록은 백틱에서 만나보세요.",
};

export default function Home() {
  return (
    <div className="home-layout">
      <section className="home-introduction" aria-labelledby="home-title">
        <p className="eyebrow">{profile.role}</p>
        <h1 id="home-title">{profile.name}</h1>
        <p className="home-name-en">{profile.nameEn}</p>
        <p className="home-description">{profile.description.split(" · ")[0]}</p>
        <p className="home-stack">Node.js · NestJS · PostgreSQL · Python</p>
        <div className="button-row">
          <Link href="/profile" className="button button-primary">프로필 보기 <FiArrowRight aria-hidden="true" /></Link>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="button button-secondary">
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="blog-panel" aria-labelledby="blog-title">
        <p className="blog-label">WRITING · BACKTICK</p>
        <div className="blog-panel-copy">
          <h2 id="blog-title"><span>블로그는</span>{" "}<span>백틱에서</span></h2>
          <p>기술 기록과 새로운 글을 만나보세요.</p>
          <span className="blog-address">backtick.blog/@theo</span>
        </div>
        <a href={BACKTICK_PROFILE_URL} className="blog-link">백틱에서 글 보기 <FiArrowUpRight aria-hidden="true" /></a>
        <span className="backtick-mark" aria-hidden="true">`/</span>
      </section>
    </div>
  );
}
