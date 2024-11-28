import ArticleList from "@/components/articles/ArticleList";
import Profile from "@/components/common/Profile";
import { getArticlesPaths } from "@/lib/articles/list";
import _ from "lodash";

export default async function Home() {
  let articles = getArticlesPaths();

  articles = _.orderBy(articles, ["date"], ["desc"]);
  return (
    <div className='w-full my-8 flex flex-col gap-3'>
      <div className='border-b-[1px]'>
        <Profile />
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
