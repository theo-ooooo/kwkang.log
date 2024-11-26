import ArticleView from "@/components/articles/articleDetailView";
import Profile from "@/components/common/Profile";
import { ARTICLE_DIRECTORY } from "@/constants/directories";
import { getAllArtclesPath, getArticleDescription } from "@/lib/articles/list";
import { GetMarkdown } from "@/lib/viewer/markdown";

export async function generateStaticParams() {
  const paths = getAllArtclesPath();

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ directory: string; id: string }>;
}) {
  const { directory, id } = await params;

  const article = GetMarkdown({
    directory: `${ARTICLE_DIRECTORY}/${directory}`,
    id,
  });
  const description = getArticleDescription(article.content);

  return {
    title: article.title,
    description: description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ directory: string; id: string }>;
}) {
  const { directory, id } = await params;

  const article = GetMarkdown({
    directory: `${ARTICLE_DIRECTORY}/${directory}`,
    id,
  });
  return (
    <div className='w-full mt-8 flex flex-col gap-3'>
      <ArticleView article={article} />
      <div className='border-t-[1px]'>
        <Profile />
      </div>
    </div>
  );
}
