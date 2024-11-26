import Profile from "@/components/common/Profile";
import MarkdownView from "@/components/posts/MarkdownView";
import { POST_DIRECTORY } from "@/constants/directories";
import { GetMarkdown } from "@/lib/viewer/markdown";

export default async function Page() {
  const data = await GetMarkdown({
    directory: `${POST_DIRECTORY}/test`,
    id: "test",
  });
  return (
    <div className='w-full mt-8 flex flex-col gap-3'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-bold'>{data.title}</h1>
          <div className='flex justify-between'>
            <div className='text-sm text-zinc-400'>{data.date}</div>
          </div>
        </div>
        <MarkdownView contentHtml={data.content} />
      </div>
      <div className='border-t-[1px]'>
        <Profile />
      </div>
    </div>
  );
}
