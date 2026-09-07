import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import profile from "@/data/profile.json";
import { BACKTICK_PROFILE_URL } from "@/constants/common";

export const metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: "사용자 경험부터 서버의 성능과 안정성까지 설계하는 풀스택 개발자 강경원. 프로필과 경력을 살펴보고, 기술 기록은 백틱에서 만나보세요.",
};

export default function Home() {
  return (
    <div className="home-layout">
      <section className="home-introduction" aria-labelledby="home-title">
        <div className="home-kicker">
          <Image src={profile.imageSrc} alt={`${profile.name} 프로필 사진`} width={80} height={80} sizes="80px" className="profile-photo home-photo" priority />
          <p className="eyebrow">{profile.role}</p>
        </div>
        <h1 id="home-title">{profile.name}</h1>
        <p className="home-name-en">{profile.nameEn}</p>
        <p className="home-description">{profile.description.split(" · ")[0]}</p>
        <p className="home-stack">React · Next.js · TypeScript · Node.js · NestJS</p>
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
