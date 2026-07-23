import { Article } from "@/types/article";
import ArticleDescView from "./ArticleDescView";

export default function ArticleList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <p className='py-20 text-center text-sm text-gray-400 dark:text-gray-500'>
        아직 글이 없어요.
      </p>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <div className='flex flex-col gap-5'>
      <ArticleDescView article={featured} featured />
      {rest.length > 0 && (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          {rest.map((article, index) => (
            <ArticleDescView article={article} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
