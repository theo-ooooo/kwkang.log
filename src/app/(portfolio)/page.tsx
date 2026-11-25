import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import profile from "@/data/profile.json";
import { BACKTICK_PROFILE_URL } from "@/constants/common";
import Sidebar from "@/components/portfolio/Sidebar";
import MoreText from "@/components/portfolio/MoreText";
import "../portfolio.css";

export const metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: "운영에서 버티는 서비스를 만드는 풀스택 개발자 강경원의 소개, 경력, 기술과 프로젝트.",
};

const strip = (html: string) => html.replace(/<[^>]+>/g, "");

export default function Home() {
  const [featured, ...others] = profile.projects;
  const latest = profile.releases[0];
  const timeline = [
    ...profile.careers.map((c) => ({ period: c.period, title: c.company, sub: c.position, items: c.description, current: c.period.includes("재직") })),
    ...profile.education.map((e) => ({ period: e.period, title: e.school, sub: `${e.major} · ${e.note}`, items: [] as string[], current: false })),
  ];

  return (
    <div className="pf">
      <Sidebar
        name={profile.name}
        role={profile.role}
        imageSrc={profile.imageSrc}
        github={profile.links.github}
        email={profile.links.email}
        blog={BACKTICK_PROFILE_URL}
        now={`언제볼까 ${latest.version} 배포 (${latest.date})`}
      />

      <main id="main-content" className="pf-main" tabIndex={-1}>
        <section id="home" className="pf-card pf-hero" aria-labelledby="hero-title">
          <div className="pf-hero-text">
            <p className="pf-hero-kicker">풀스택 개발자, 2021년부터</p>
            <h1 id="hero-title">운영에서 버티는 서비스를 만드는<br />개발자 {profile.name}입니다.</h1>
            <p className="pf-hero-lead">화면부터 API, 데이터베이스까지 직접 만들어요. 회사에서는 보안 컴플라이언스 플랫폼의 느린 쿼리와 장애를 잡고, 그 밖의 시간에는 공유 달력 언제볼까를 만들어 운영합니다.</p>
            <div className="pf-hero-actions">
              <a href={`mailto:${profile.links.email}`} className="pf-btn pf-btn-light">메일 보내기 <FiArrowRight aria-hidden="true" /></a>
              <Link href="/profile" className="pf-btn pf-btn-ghost">이력서 보기</Link>
            </div>
          </div>
          <div className="pf-hero-phone" aria-hidden="true">
            <Image src={featured.images![0]} alt="" width={540} height={960} sizes="240px" priority />
          </div>
        </section>

        <section id="about" className="pf-card" aria-labelledby="about-title">
          <h2 id="about-title" className="pf-h2">소개</h2>
          <div className="pf-about">
            <div className="pf-about-photo">
              <Image src={profile.imageSrc} alt={`${profile.name} 사진`} width={200} height={200} sizes="200px" />
            </div>
            <div>
              <MoreText paragraphs={profile.introduction} />
              <dl className="pf-facts">
                <div><dt>이름</dt><dd>{profile.name} ({profile.nameEn})</dd></div>
                <div><dt>생년월일</dt><dd>{profile.birthDate}</dd></div>
                <div><dt>메일</dt><dd><a href={`mailto:${profile.links.email}`}>{profile.links.email}</a></dd></div>
              </dl>
            </div>
          </div>
          <ul className="pf-strengths">
            {profile.strengths.map((s) => (
              <li key={s.title}><strong>{s.title}</strong><span>{s.description}</span></li>
            ))}
          </ul>
        </section>

        <section id="experience" className="pf-card" aria-labelledby="exp-title">
          <h2 id="exp-title" className="pf-h2">경력과 학력</h2>
          <ol className="pf-timeline">
            {timeline.map((t) => (
              <li key={t.title} data-current={t.current || undefined}>
                <p className="pf-tl-period">{t.period}</p>
                <div className="pf-tl-body">
                  <h3>{t.title}</h3>
                  <p className="pf-tl-sub">{t.sub}</p>
                  {t.items.length > 0 && (
                    <ul>{t.items.map((i) => <li key={i}>{i}</li>)}</ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="pf-card" aria-labelledby="skills-title">
          <h2 id="skills-title" className="pf-h2">기술</h2>
          <div className="pf-skills">
            {Object.entries(profile.techStack).map(([cat, list]) => (
              <div key={cat} className="pf-skill-row">
                <h3>{cat}</h3>
                <ul>{list.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="pf-card" aria-labelledby="projects-title">
          <h2 id="projects-title" className="pf-h2">만든 것</h2>

          <article className="pf-featured">
            <div className="pf-featured-text">
              <p className="pf-tag" data-status={featured.status}>{featured.status}</p>
              <h3>{featured.title}</h3>
              <ul className="pf-list">{featured.description.map((d) => <li key={d}>{d}</li>)}</ul>
              <div className="pf-releases">
                <p>최근 릴리스</p>
                <ol>
                  {profile.releases.map((r) => (
                    <li key={r.version}><span>{r.date} v{r.version}</span>{r.title}</li>
                  ))}
                </ol>
              </div>
              <div className="pf-featured-links">
                <a href={featured.link ?? "#"} target="_blank" rel="noopener noreferrer">whenwemeet.day <FiArrowUpRight aria-hidden="true" /></a>
                {featured.appStore && <a href={featured.appStore} target="_blank" rel="noopener noreferrer">App Store <FiArrowUpRight aria-hidden="true" /></a>}
              </div>
            </div>
            <div className="pf-featured-shots">
              {featured.images!.map((src) => (
                <Image key={src} src={src} alt="언제볼까 앱 화면" width={540} height={960} sizes="(max-width: 760px) 40vw, 180px" />
              ))}
            </div>
          </article>

          <div className="pf-projects">
            {others.map((p) => (
              <article key={p.title} className="pf-project">
                <div className="pf-project-meta">
                  <span>{p.type}</span>
                  <span className="pf-tag" data-status={p.status}>{p.status}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{strip(p.description[0])}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} 보기 (새 탭)`}>
                    보기 <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="pf-card pf-contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="pf-h2">연락</h2>
          <p>일 이야기, 언제볼까 이야기 모두 메일로 주세요.</p>
          <a className="pf-contact-mail" href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
          <div className="pf-contact-links">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub <FiArrowUpRight aria-hidden="true" /></a>
            <a href={BACKTICK_PROFILE_URL} target="_blank" rel="noopener noreferrer">백틱에서 글 읽기 <FiArrowUpRight aria-hidden="true" /></a>
            <Link href="/profile">이력서 <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <p className="pf-copy">© {new Date().getFullYear()} {profile.nameEn}</p>
        </section>
      </main>
    </div>
  );
}
