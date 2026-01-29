import { Article } from "@/types/article";
import ArticleDescView from "./ArticleDescView";

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-8'>
      {articles.map((article, index) => (
        <ArticleDescView article={article} key={index} />
      ))}
    </div>
  );
}
