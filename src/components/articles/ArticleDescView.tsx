import { Article } from "@/types/article";
import clsx from "clsx";
import Link from "next/link";

export default function ArticleDescView({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const category = article.tags[article.tags.length - 1] ?? article.tags[0];

  return (
    <Link
      href={`${article.route}`}
      className='group -mx-4 flex flex-col gap-2 rounded-2xl px-4 py-5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/60'
    >
      <div className='flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500'>
        <time>{article.date}</time>
        {category && (
          <>
            <span aria-hidden>·</span>
            <span className='font-medium text-indigo-500 dark:text-indigo-400'>
              {category}
            </span>
          </>
        )}
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
          "text-sm leading-relaxed text-gray-500 dark:text-gray-400",
          featured ? "line-clamp-2" : "line-clamp-1"
        )}
      >
        {article.description}
      </p>
    </Link>
  );
}
