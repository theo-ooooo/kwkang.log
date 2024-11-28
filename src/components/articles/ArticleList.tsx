import { Article } from "@/types/article";
import ArticleDescView from "./ArticleDescView";

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className='flex flex-col gap-5 my-8'>
      {articles.map((article, index) => (
        <ArticleDescView article={article} key={index} />
      ))}
    </div>
  );
}
