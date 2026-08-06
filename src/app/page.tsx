import Link from "next/link";
import Profile from "@/components/common/Profile";

export const metadata = {
  title: "kwkang.log — 백틱으로 이사했어요",
  description: "블로그 글은 이제 백틱(backtick.blog)에서 만나요.",
};

export default function Home() {
  return (
    <div className='w-full my-8 flex flex-col gap-8'>
      <Profile />

      <div className='rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center'>
        <div className='font-mono text-3xl font-semibold text-[#e0533d]'>`</div>
        <h1 className='mt-3 text-xl font-extrabold tracking-tight dark:text-white'>
          블로그가 <span className='text-[#e0533d]'>백틱</span>으로 이사했어요
        </h1>
        <p className='mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
          여기 있던 글 전부와 새 글은 이제 직접 만든 개발 블로그 플랫폼
          <br className='hidden sm:block' /> <strong>backtick.blog</strong>에서 볼 수 있어요.
        </p>
        <div className='mt-6 flex items-center justify-center gap-3'>
          <a
            href='https://backtick.blog/@kwkang'
            className='rounded-full bg-gray-900 dark:bg-white px-5 py-2.5 text-sm font-bold text-white dark:text-gray-900 transition hover:opacity-85'
          >
            백틱에서 글 보기 →
          </a>
          <Link
            href='/profile'
            className='rounded-full border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 transition hover:border-gray-900 dark:hover:border-white'
          >
            프로필
          </Link>
        </div>
      </div>
    </div>
  );
}
