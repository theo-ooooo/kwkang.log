import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import profile from "@/data/profile.json";
import { BACKTICK_PROFILE_URL } from "@/constants/common";
import PrintButton from "@/components/profile/PrintButton";
import "../../resume.css";

export const metadata: Metadata = {
  title: "이력서 — 강경원",
  description: "풀스택 개발자 강경원의 이력서: 경력, 프로젝트, 기술, 학력",
};

const strip = (html: string) => html.replace(/<[^>]+>/g, "");

export default function ResumePage() {
  const { name, nameEn, birthDate, imageSrc, role, links } = profile;

  return (
    <div className="rs">
      <div className="rs-bar">
        <Link href="/" className="rs-btn"><FiArrowLeft size={16} aria-hidden="true" /> 홈으로</Link>
        <PrintButton />
      </div>

      <main id="main-content" className="rs-sheet" tabIndex={-1}>
        <header className="rs-head">
          <Image src={imageSrc} alt={`${name} 사진`} width={96} height={96} className="rs-photo" priority />
          <div className="rs-id">
            <h1>{name} <span>{nameEn}</span></h1>
            <p className="rs-role">{role}</p>
            <ul className="rs-contact">
              <li><a href={`mailto:${links.email}`}>{links.email}</a></li>
              <li><a href={links.github}>github.com/theo-ooooo</a></li>
              <li><a href={BACKTICK_PROFILE_URL}>backtick.blog/@theo</a></li>
              <li>{birthDate}</li>
            </ul>
          </div>
        </header>

        <section className="rs-section" aria-labelledby="rs-about">
          <h2 id="rs-about">소개</h2>
          <div className="rs-intro">
            {profile.introduction.slice(0, 4).map((p, i) => <p key={i}>{strip(p)}</p>)}
          </div>
        </section>

        <section className="rs-section" aria-labelledby="rs-career">
          <h2 id="rs-career">경력</h2>
          {profile.careers.map((c) => (
            <article key={c.company} className="rs-item">
              <p className="rs-period">{c.period}</p>
              <div>
                <h3>{c.company} <span>{c.position}</span></h3>
                <p className="rs-tags">{c.tags.join(", ")}</p>
                <ul>{c.description.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            </article>
          ))}
        </section>

        <section className="rs-section" aria-labelledby="rs-projects">
          <h2 id="rs-projects">프로젝트</h2>
          {profile.projects.map((p) => (
            <article key={p.title} className="rs-item">
              <p className="rs-period">{p.status}</p>
              <div>
                <h3>{p.title} <span>{p.type}</span></h3>
                <ul>{p.description.map((d) => <li key={d}>{strip(d)}</li>)}</ul>
                {p.link && <p className="rs-link"><a href={p.link}>{p.link.replace(/^https?:\/\//, "")}</a></p>}
              </div>
            </article>
          ))}
        </section>

        <section className="rs-section" aria-labelledby="rs-skills">
          <h2 id="rs-skills">기술</h2>
          <dl className="rs-skills">
            {Object.entries(profile.techStack).map(([cat, list]) => (
              <div key={cat}><dt>{cat}</dt><dd>{list.join(", ")}</dd></div>
            ))}
          </dl>
        </section>

        <section className="rs-section" aria-labelledby="rs-edu">
          <h2 id="rs-edu">학력</h2>
          {profile.education.map((e) => (
            <article key={e.school} className="rs-item">
              <p className="rs-period">{e.period}</p>
              <div>
                <h3>{e.school} <span>{e.major}</span></h3>
                <p className="rs-note">{e.note}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
