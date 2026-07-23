import { Article } from "@/types/article";
import ArticleDescView from "./ArticleDescView";

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className='divide-y divide-gray-100 dark:divide-gray-800'>
      {articles.map((article, index) => (
        <ArticleDescView article={article} key={index} />
      ))}
    </div>
  );
}
