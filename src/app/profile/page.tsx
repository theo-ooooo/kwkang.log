import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FiArrowUpRight, FiGithub, FiMail } from "react-icons/fi";
import profile from "@/data/profile.json";
import { BACKTICK_PROFILE_URL } from "@/constants/common";
import PrintButton from "@/components/profile/PrintButton";
import SectionNavigation from "@/components/profile/SectionNavigation";
import Introduction from "@/components/profile/Introduction";

export const metadata: Metadata = {
  title: "프로필 — 강경원",
  description: "백엔드 개발자 강경원의 소개, 경력, 기술 스택과 프로젝트",
};

function SectionHeading({ id, number, children }: { id: string; number: string; children: ReactNode }) {
  return <h2 id={id} className="section-heading"><span aria-hidden="true">{number}</span>{children}</h2>;
}

export default function ProfilePage() {
  const { name, nameEn, birthDate, role, description, links } = profile;

  return (
    <div className="profile-page">
      <div className="profile-masthead">
        <div className="profile-identity">
          <span className="profile-monogram" aria-hidden="true">Kw</span>
          <div>
            <p className="eyebrow">{nameEn}</p>
            <h1>{name}</h1>
            <p className="profile-role">{role}</p>
          </div>
        </div>
        <div className="profile-masthead-actions">
          <PrintButton />
          <span className="profile-birthdate">{birthDate}</span>
        </div>
        <p className="profile-description">{description}</p>
      </div>

      <div className="profile-layout">
        <SectionNavigation />
        <div className="profile-content">
          <section id="about" className="profile-section" aria-labelledby="about-heading">
            <SectionHeading id="about-heading" number="01">소개</SectionHeading>
            <Introduction paragraphs={profile.introduction} />
            <div className="strengths-grid">
              {profile.strengths.map((strength) => (
                <div className="strength-item" key={strength.title}>
                  <h3>{strength.title}</h3>
                  <p>{strength.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="career" className="profile-section" aria-labelledby="career-heading">
            <SectionHeading id="career-heading" number="02">경력</SectionHeading>
            <ol className="career-timeline">
              {profile.careers.map((career) => (
                <li className="career-item" key={career.company}>
                  <p className="career-period">{career.period}</p>
                  <div className="career-details">
                    <h3>{career.company}</h3>
                    <p className="career-position">{career.position}</p>
                    <div className="tag-list">
                      {career.tags.map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}
                    </div>
                    <ul className="detail-list">
                      {career.description.map((description) => <li key={description}>{description}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="skills" className="profile-section" aria-labelledby="skills-heading">
            <SectionHeading id="skills-heading" number="03">기술</SectionHeading>
            <div className="skills-list">
              {Object.entries(profile.techStack).map(([category, technologies]) => (
                <div className="skill-category" key={category}>
                  <h3>{category}</h3>
                  <div className="tag-list">
                    {technologies.map((technology) => <span className="skill-tag" key={technology}>{technology}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="profile-section" aria-labelledby="projects-heading">
            <SectionHeading id="projects-heading" number="04">프로젝트</SectionHeading>
            <div className="projects-grid">
              {profile.projects.map((project) => (
                <article className="project-item" key={project.title}>
                  <div className="project-meta">
                    <span>{project.type}</span>
                    {project.status && <span className="project-status" data-status={project.status}>{project.status}</span>}
                  </div>
                  <h3>{project.title}</h3>
                  <ul className="detail-list">
                    {project.description.map((description) => <li key={description}>{description}</li>)}
                  </ul>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`${project.title} 바로가기 (새 탭)`}>
                      프로젝트 보기 <FiArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="education" className="profile-section" aria-labelledby="education-heading">
            <SectionHeading id="education-heading" number="05">학력</SectionHeading>
            <ol className="education-list">
              {profile.education.map((education) => (
                <li className="education-item" key={education.school}>
                  <p className="career-period">{education.period}</p>
                  <div>
                    <h3>{education.school}</h3>
                    <p>{education.major}</p>
                    <span>{education.note}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="contact" className="profile-section contact-section" aria-labelledby="contact-heading">
            <SectionHeading id="contact-heading" number="06">연락처</SectionHeading>
            <dl className="contact-list">
              <div>
                <dt><FiGithub aria-hidden="true" /> GitHub</dt>
                <dd><a href={links.github} target="_blank" rel="noopener noreferrer">github.com/theo-ooooo <FiArrowUpRight aria-hidden="true" /></a></dd>
              </div>
              <div>
                <dt><FiArrowUpRight aria-hidden="true" /> Blog</dt>
                <dd><a href={BACKTICK_PROFILE_URL} target="_blank" rel="noopener noreferrer">backtick.blog/@theo <FiArrowUpRight aria-hidden="true" /></a></dd>
              </div>
              <div>
                <dt><FiMail aria-hidden="true" /> Email</dt>
                <dd><a href={`mailto:${links.email}`}>{links.email} <FiArrowUpRight aria-hidden="true" /></a></dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
