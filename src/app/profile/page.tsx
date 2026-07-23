import { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaEnvelope, FaLink } from "react-icons/fa";
import profile from "@/data/profile.json";
import PrintButton from "@/components/profile/PrintButton";

export const metadata: Metadata = {
  title: "Profile",
  description: "백엔드 개발자 강경원의 프로필",
};

/** 섹션 제목 — 인디고 액센트 바 + extrabold. 인쇄 시엔 globals.css의 h2 규칙이 밑줄을 담당. */
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 border-l-4 border-indigo-600 pl-3 text-lg font-extrabold tracking-tight text-gray-900 dark:text-white print:mb-3 print:border-l-0 print:pl-0">
      {children}
    </h2>
  );
}

export default function ProfilePage() {
  const { name, nameEn, birthDate, imageSrc, role, description, links } = profile;

  // 생년월일(YYYY.MM.DD) → 만 나이
  const age = (() => {
    const [y, m, d] = birthDate.split(".").map(Number);
    const now = new Date();
    let a = now.getFullYear() - y;
    if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) a--;
    return a;
  })();

  return (
    <>
      <PrintButton />

      <div className="my-8 flex w-full flex-col gap-12 print:my-4 print:gap-6">
        {/* ── 헤더 (히어로 배너 카드) ── */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 print:rounded print:shadow-none">
          {/* 슬림 인디고→바이올렛 배너 */}
          <div className="h-28 bg-gradient-to-r from-indigo-500 to-violet-500 md:h-36 print:hidden" />

          <div className="px-6 pb-8 md:px-10 print:px-4 print:pb-4">
            <div className="-mt-12 flex flex-col items-center text-center md:-mt-14 print:mt-0">
              {/* 배너에 걸친 라운드 아바타 */}
              <Image
                src={imageSrc}
                alt="Profile"
                width={128}
                height={128}
                className="h-28 w-28 rounded-3xl object-cover shadow-md ring-4 ring-white dark:ring-gray-900 md:h-32 md:w-32 print:h-24 print:w-24 print:shadow-none print:ring-0"
                priority
              />

              <div className="mt-4 flex flex-col items-center gap-2 print:mt-2">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                    {name}
                  </h1>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                    {role}
                  </span>
                </div>
                <p className="text-sm font-medium tracking-wide text-gray-400 dark:text-gray-500">
                  {nameEn}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {birthDate} · 만 {age}세
                </p>
              </div>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 print:text-sm">
                {description}
              </p>

              {/* 소셜 / 이메일 버튼 */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
                <Link
                  href={links.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FaGithub size={16} />
                  GitHub
                </Link>
                <Link
                  href={links.blog}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FaLink size={15} />
                  Blog
                </Link>
                <Link
                  href={`mailto:${links.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FaEnvelope size={15} />
                  Email
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 핵심 강점 ── */}
        <section>
          <SectionHeading>핵심 강점</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 print:grid-cols-3 print:gap-3">
            {profile.strengths.map((strength, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:rounded print:p-4"
              >
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300 print:hidden">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="text-base font-extrabold text-gray-900 dark:text-white">
                  {strength.title}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400 print:text-xs">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 자기소개 ── */}
        <section>
          <SectionHeading>자기소개</SectionHeading>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8 print:rounded print:p-4">
            <div className="space-y-4 text-[15px] leading-[1.85] text-gray-600 dark:text-gray-300 print:space-y-2 print:text-sm print:leading-normal">
              {profile.introduction.map((text, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 경력 (타임라인) ── */}
        <section>
          <SectionHeading>경력</SectionHeading>
          <ol className="relative space-y-8 border-s border-gray-200 pl-8 dark:border-gray-800 print:space-y-4 print:pl-6">
            {profile.careers.map((career, index) => (
              <li key={index} className="career-item relative">
                {/* 인디고 타임라인 점 */}
                <span className="absolute -start-[40px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-indigo-600 bg-white dark:bg-gray-900 print:hidden">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                </span>

                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white md:text-lg">
                      {career.company}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-500">
                      {career.period} · {career.position}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:justify-end">
                    {career.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="mt-3 space-y-1.5 print:mt-2 print:space-y-1">
                  {career.description.map((desc, descIndex) => (
                    <li
                      key={descIndex}
                      className="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-sm"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-indigo-400 print:hidden" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 기술 스택 ── */}
        <section>
          <SectionHeading>기술 스택</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
            {Object.entries(profile.techStack).map(([category, technologies]) => (
              <div
                key={category}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:rounded print:p-3"
              >
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 print:mb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="tech-stack-tag rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 print:rounded print:px-2 print:py-1"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 프로젝트 ── */}
        <section>
          <SectionHeading>프로젝트</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 print:grid-cols-1 print:gap-3">
            {profile.projects.map((project, index) => {
              const isLongParagraph =
                project.description.length === 1 &&
                project.description[0].length > 100;

              return (
                <div
                  key={index}
                  className="project-item flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 print:rounded print:p-4 print:shadow-none"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white md:text-lg">
                      {project.title}
                    </h3>
                    {"status" in project && project.status && (
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          project.status === "개발완료"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300"
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>

                  <span className="mb-4 inline-block w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:mb-2">
                    {project.type}
                  </span>

                  {isLongParagraph ? (
                    <p className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {project.description[0]}
                    </p>
                  ) : (
                    <ul className="flex-1 space-y-1.5">
                      {project.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-indigo-400 print:hidden" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20 print:hidden"
                    >
                      <FaLink size={12} />
                      바로가기
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 연락처 ── */}
        <section>
          <SectionHeading>연락처</SectionHeading>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:rounded print:p-4">
            <ul className="space-y-4 print:space-y-2">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:hidden">
                  <FaGithub size={16} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 print:hidden">
                    GitHub
                  </div>
                  <Link
                    href={links.github}
                    target="_blank"
                    className="break-all text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400 print:text-gray-700 print:no-underline"
                  >
                    {links.github}
                  </Link>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:hidden">
                  <FaLink size={15} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 print:hidden">
                    Blog
                  </div>
                  <Link
                    href={links.blog}
                    target="_blank"
                    className="break-all text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400 print:text-gray-700 print:no-underline"
                  >
                    {links.blog}
                  </Link>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:hidden">
                  <FaEnvelope size={15} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 print:hidden">
                    Email
                  </div>
                  <Link
                    href={`mailto:${links.email}`}
                    className="break-all text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400 print:text-gray-700 print:no-underline"
                  >
                    {links.email}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
