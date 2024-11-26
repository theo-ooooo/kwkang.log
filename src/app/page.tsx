import Profile from "@/components/common/Profile";
import MarkdownView from "@/components/posts/MarkdownView";
import { POST_DIRECTORY } from "@/constants/directories";
import { GetMarkdown } from "@/lib/viewer/markdown";

export default async function Home() {
  const data = await GetMarkdown({
    directory: `${POST_DIRECTORY}/test`,
    id: "test",
  });
  return (
    <div className='w-full '>
      <Profile />
      <MarkdownView contentHtml={data.content} />
    </div>
  );
}
