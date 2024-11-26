import Profile from "@/components/common/Profile";
import { getArticlesPaths } from "@/lib/articles/list";
import Link from "next/link";

export default async function Home() {
  const data = getArticlesPaths();
  return (
    <div className='w-full mt-8 flex flex-col gap-3'>
      <div className='border-b-[1px]'>
        <Profile />
      </div>
      <div className='flex flex-col gap-3'>
        {data.map((article, index) => (
          <Link
            href={`${article.route}`}
            key={`${article.route}/${index}`}
            className='flex flex-col w-full gap-3'
          >
            <div className='flex flex-col'>
              <h2 className='w-full text-2xl overflow-hidden whitespace-nowrap font-bold truncate'>
                {article.title}
              </h2>
              <div className='flex justify-between'>
                <p className='text-sm text-zinc-400'>{article.date}</p>
              </div>
            </div>
            <p>{article.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
