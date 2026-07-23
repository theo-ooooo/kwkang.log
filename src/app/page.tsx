import ArticleList from "@/components/articles/ArticleList";
import Profile from "@/components/common/Profile";
import TagSeletor from "@/components/tags/TagSeletor";
import { getArticlesPaths } from "@/lib/articles/list";
import { Article } from "@/types/article";
import _ from "lodash";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag: string }>;
}) {
  let articles = getArticlesPaths().sort(
    (a: Article, b: Article) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const tags = _.uniq(articles.flatMap((article) => article.tags));

  const selectedTag = (await searchParams).tag;

  if (selectedTag) {
    articles = articles.filter((article) => article.tags.includes(selectedTag));
  }

  return (
    <div className='w-full my-8 flex flex-col gap-6'>
      <Profile />
      <TagSeletor tags={["All", ...tags]} />
      <div className='flex items-baseline justify-between px-1'>
        <h2 className='text-lg font-extrabold tracking-tight dark:text-white'>
          {selectedTag && selectedTag !== "All" ? `#${selectedTag}` : "최근 글"}
        </h2>
        <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>
          {articles.length}개의 글
        </span>
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
