import { Article } from "@/types/article";
import Link from "next/link";

export default function ArticleDescView({ article }: { article: Article }) {
  return (
    <Link href={`${article.route}`} className='group block py-7'>
      <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-gray-400 dark:text-gray-500'>
        <time>{article.date}</time>
        {article.tags.length > 0 && <span aria-hidden>·</span>}
        <div className='flex flex-wrap gap-x-2'>
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className='transition-colors group-hover:text-indigo-500'
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <h2 className='mt-2.5 text-xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400'>
        {article.title}
      </h2>

      <p className='mt-2 text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2'>
        {article.description}…
      </p>

      <span className='mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 dark:text-indigo-400'>
        읽기
        <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
        </svg>
      </span>
    </Link>
  );
}
