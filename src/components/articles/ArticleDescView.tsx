import { Article } from "@/types/article";
import { tagColor } from "@/constants/tagColors";
import clsx from "clsx";
import Link from "next/link";

export default function ArticleDescView({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      href={`${article.route}`}
      className={clsx(
        "group relative flex flex-col rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900",
        featured
          ? "gap-4 p-7 border-indigo-100 dark:border-indigo-500/20 ring-1 ring-indigo-50 dark:ring-indigo-500/10"
          : "gap-3 p-6 border-gray-100 dark:border-gray-800"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {featured && (
          <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
            NEW
          </span>
        )}
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className={clsx(
              "rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
              tagColor(tag)
            )}
          >
            {tag}
          </span>
        ))}
        <time className="ml-auto text-xs font-medium text-gray-400 dark:text-gray-500">
          {article.date}
        </time>
      </div>

      <h2
        className={clsx(
          "font-bold tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400",
          featured ? "text-2xl leading-snug" : "text-lg leading-snug"
        )}
      >
        {article.title}
      </h2>

      <p
        className={clsx(
          "leading-relaxed text-gray-500 dark:text-gray-400",
          featured ? "text-[15px] line-clamp-3" : "text-sm line-clamp-2"
        )}
      >
        {article.description}…
      </p>

      <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
        읽어보기
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </Link>
  );
}
