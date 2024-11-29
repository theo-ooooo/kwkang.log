import ArticleList from "@/components/articles/ArticleList";
import Profile from "@/components/common/Profile";
import Tag from "@/components/tags/Tag";
import TagSeletor from "@/components/tags/TagSeletor";
import { getArticlesPaths } from "@/lib/articles/list";
import _ from "lodash";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag: string }>;
}) {
  let articles = getArticlesPaths();

  articles = _.orderBy(articles, ["date"], ["desc"]);

  const tags = _.uniq(articles.flatMap((article) => article.tags));

  const selectedTag = (await searchParams).tag;

  if (selectedTag) {
    articles = articles.filter((article) => article.tags.includes(selectedTag));
  }

  return (
    <div className='w-full my-8 flex flex-col gap-3'>
      <div className='border-b-[1px]'>
        <Profile />
      </div>
      <TagSeletor tags={["All", ...tags]} />
      <ArticleList articles={articles} />
    </div>
  );
}
