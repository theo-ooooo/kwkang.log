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
    <div className='w-full my-8 flex flex-col gap-8'>
      <Profile />
      <TagSeletor tags={["All", ...tags]} />
      <ArticleList articles={articles} />
    </div>
  );
}
