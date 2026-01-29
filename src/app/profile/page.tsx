import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaEnvelope, FaLink, FaCheckCircle, FaClock } from "react-icons/fa";
import profile from "@/data/profile.json";
import PrintButton from "@/components/profile/PrintButton";

export const metadata: Metadata = {
  title: "Profile",
  description: "백엔드 개발자 강경원의 프로필",
};

export default function ProfilePage() {
  return (
    <>
      <PrintButton />
      <div className="w-full my-8 flex flex-col gap-10 print:my-4 print:gap-6">
        {/* Header */}
        <div className="relative text-center space-y-6 pb-12 border-b border-gray-200 dark:border-gray-800 print:pb-6 print:space-y-4">
          <div className="flex justify-center mb-6 print:mb-4">
            <Image
              src={profile.imageSrc}
              alt="Profile"
              width={140}
              height={140}
              className="rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-lg print:w-24 print:h-24"
              priority
            />
          </div>
          <div className="space-y-3 print:space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold dark:text-white print:text-3xl">
              {profile.name}
            </h1>
            <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs md:text-sm font-semibold print:text-xs">
              {profile.role}
            </div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto print:text-base">
              {profile.description}
            </p>
          </div>
          <div className="flex justify-center gap-4 pt-4 print:hidden">
            <Link
              href={profile.links.github}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
            >
              <FaGithub size={18} />
              <span className="font-medium">GitHub</span>
            </Link>
            <Link
              href={profile.links.blog}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
            >
              <FaLink size={16} />
              <span className="font-medium">Blog</span>
            </Link>
            <Link
              href={`mailto:${profile.links.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
            >
              <FaEnvelope size={16} />
              <span className="font-medium">Email</span>
            </Link>
          </div>
        </div>

        {/* 핵심 강점 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 print:grid-cols-3 print:gap-3 print:mb-4">
          {profile.strengths.map((strength, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 print:p-4 print:border print:rounded"
            >
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-2 print:text-lg print:mb-1">
                {strength.title}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 print:text-xs">
                {strength.description}
              </div>
            </div>
          ))}
        </section>

        {/* 자기소개 */}
        <section className="space-y-4 print:space-y-2">
          <h2 className="text-xl md:text-2xl font-bold dark:text-white pb-3 border-b-2 border-gray-200 dark:border-gray-800 print:text-xl print:pb-2">
            자기소개
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed print:space-y-2 print:text-sm">
            {profile.introduction.map((text, index) => (
              <p
                key={index}
                className="text-sm md:text-base print:text-sm"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
        </section>

        {/* 경력 */}
        <section className="space-y-6 print:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold dark:text-white pb-3 border-b border-gray-200 dark:border-gray-800 print:text-xl print:pb-2">
            경력
          </h2>

          <div className="space-y-8 print:space-y-4">
            {profile.careers.map((career, index) => (
              <div key={index} className="career-item space-y-3 print:space-y-2">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 print:flex-row">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold dark:text-white print:text-lg">
                      {career.company}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 print:text-xs">
                      {career.period} | {career.position}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 whitespace-nowrap shrink-0 leading-tight print:text-xs print:px-2 print:py-0.5">
                    {career.tags.join(", ")}
                  </span>
                </div>
                <ul className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 print:space-y-1 print:text-sm">
                  {career.description.map((desc, descIndex) => (
                    <li key={descIndex} className="flex items-start gap-2 print:gap-1">
                      <span className="text-gray-400 dark:text-gray-600 mt-1 print:text-xs">
                        •
                      </span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="space-y-6 print:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold dark:text-white pb-3 border-b border-gray-200 dark:border-gray-800 print:text-xl print:pb-2">
            기술 스택
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
            {Object.entries(profile.techStack).map(([category, technologies]) => (
              <div
                key={category}
                className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 print:p-3 print:border print:rounded"
              >
                <h3 className="text-base md:text-lg font-bold dark:text-white mb-4 print:text-base print:mb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="tech-stack-tag px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm print:text-xs print:px-2 print:py-1 print:border print:rounded"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 프로젝트 경험 */}
        <section className="space-y-6 print:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold dark:text-white pb-3 border-b-2 border-gray-200 dark:border-gray-800 print:text-xl print:pb-2">
            프로젝트 경험
          </h2>

          <div className="space-y-6 print:space-y-4">
            {profile.projects.map((project, index) => (
              <div
                key={index}
                className="project-item relative p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all print:p-4 print:border print:rounded print:shadow-none"
              >
                {"status" in project && project.status && (
                  <div className={`absolute top-3 right-3 print:hidden ${
                    project.status === "개발완료" 
                      ? "text-green-500 dark:text-green-400" 
                      : "text-yellow-500 dark:text-yellow-400"
                  }`}>
                    {project.status === "개발완료" ? (
                      <FaCheckCircle size={20} className="drop-shadow-sm" />
                    ) : (
                      <FaClock size={20} className="drop-shadow-sm" />
                    )}
                  </div>
                )}
              <div className="mb-4 print:mb-2">
                <h3 className="text-lg md:text-xl font-bold dark:text-white mb-2 print:text-lg print:mb-1">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 print:text-xs print:px-2 print:py-0.5">
                    {project.type}
                  </span>
                </div>
              </div>
                {project.description.length === 1 &&
                project.description[0].length > 100 ? (
                  <>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3 print:text-sm print:mb-2">
                    {project.description[0]}
                  </p>
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium print:hidden"
                      >
                        <FaLink size={14} />
                        <span>{project.link}</span>
                      </Link>
                    )}
                  </>
                ) : (
                <>
                  <ul className="space-y-2.5 text-sm md:text-base text-gray-700 dark:text-gray-300 print:space-y-1 print:text-sm">
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start gap-2 print:gap-1">
                        <span className="text-gray-400 dark:text-gray-600 mt-1 print:text-xs">
                          •
                        </span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium mt-3 print:hidden"
                    >
                      <FaLink size={14} />
                      <span>{project.link}</span>
                    </Link>
                  )}
                </>
              )}
              </div>
            ))}
          </div>
        </section>

        {/* 연락처 */}
        <section className="space-y-4 print:space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold dark:text-white pb-2 border-b border-gray-200 dark:border-gray-800 print:text-xl print:pb-1">
            연락처
          </h2>
          <div className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300 print:space-y-1 print:text-sm">
            <div className="flex items-center gap-3 print:gap-2">
              <FaGithub size={18} className="text-gray-500 dark:text-gray-400 print:hidden" />
              <span className="print:hidden">GitHub: </span>
              <Link
                href={profile.links.github}
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline print:text-gray-700 print:no-underline"
              >
                {profile.links.github}
              </Link>
            </div>
            <div className="flex items-center gap-3 print:gap-2">
              <FaLink size={16} className="text-gray-500 dark:text-gray-400 print:hidden" />
              <span className="print:hidden">Blog: </span>
              <Link
                href={profile.links.blog}
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline print:text-gray-700 print:no-underline"
              >
                {profile.links.blog}
              </Link>
            </div>
            <div className="flex items-center gap-3 print:gap-2">
              <FaEnvelope size={16} className="text-gray-500 dark:text-gray-400 print:hidden" />
              <span className="print:hidden">Email: </span>
              <Link
                href={`mailto:${profile.links.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline print:text-gray-700 print:no-underline"
              >
                {profile.links.email}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
