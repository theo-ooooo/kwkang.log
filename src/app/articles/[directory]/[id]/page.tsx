import ArticleView from "@/components/articles/ArticleDetailView";
import Utterances from "@/components/articles/Utterances";
import Profile from "@/components/common/Profile";
import { ARTICLE_DIRECTORY } from "@/constants/directories";
import { getAllArtclesPath, getArticleDescription } from "@/lib/articles/list";
import { GetMarkdown } from "@/lib/viewer/markdown";
import { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const paths = getAllArtclesPath();

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ directory: string; id: string }>;
}): Promise<Metadata> {
  const { directory, id } = await params;

  const article = GetMarkdown({
    directory: `${ARTICLE_DIRECTORY}/${directory}`,
    id,
  });
  const description = getArticleDescription(article.content);

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      siteName: "kwkang.log",
      url: `https://kwkang.net/articles/${directory}/${id}`,
      images: [
        {
          url: `/api/og?title=${article.title}`,
          width: 1200,
          height: 630,
          alt: id,
        },
      ],
    },
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
      <div className='border-t-[1px]'>
        <Utterances />
      </div>
    </div>
  );
}
