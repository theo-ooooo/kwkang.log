import { Article } from "@/types/article";
import MarkdownView from "./MarkdownView";

export default function ArticleView({ article }: { article: Article }) {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>{article.title}</h1>
        <div className='flex justify-between'>
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
      <MarkdownView contentHtml={article.content} />
    </div>
  );
}
