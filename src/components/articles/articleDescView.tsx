import { Article } from "@/types/article";
import Link from "next/link";

export default function ArticleDescView({ article }: { article: Article }) {
  return (
    <Link href={`${article.route}`} className='flex flex-col w-full gap-3'>
      <div className='flex flex-col'>
        <h2 className='w-full text-2xl overflow-hidden whitespace-nowrap font-bold truncate'>
          {article.title}
        </h2>
        <div className='flex justify-between gap-3'>
          <div className='text-sm text-zinc-400'>{article.date}</div>
          <div className='flex gap-2 text-sm text-zinc-400'>
            {article.tags.map((tag) => {
              return (
                <span key={tag} className={`text-xs font-semibold rounded`}>
                  {tag.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <p>{article.description}</p>
    </Link>
  );
}
