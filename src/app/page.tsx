import Link from "next/link";

export const metadata = {
  title: "kwkang.log — 백틱으로 이사했어요",
  description: "블로그 글은 이제 백틱(backtick.blog)에서 만나요.",
};

export default function Home() {
  return (
    <div className='w-full py-10 sm:py-14'>
      {/* 백틱 이사 안내 — 프로필 카드와 같은 디자인 언어 */}
      <section className='overflow-hidden rounded-3xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900'>
        {/* 상단 배너 */}
        <div className='h-24 bg-gradient-to-r from-indigo-500/90 to-violet-500/90' />

        <div className='px-6 pb-8 sm:px-10'>
          {/* 배너에 걸치는 백틱 타일 */}
          <div className='-mt-9 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gray-900 font-mono text-3xl font-semibold text-[#e0533d] ring-4 ring-white dark:bg-gray-950 dark:ring-gray-900'>
            `
          </div>

          <div className='mt-5'>
            <span className='rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300'>
              공지
            </span>
            <h1 className='mt-3 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
              블로그가 <span className='text-[#e0533d]'>백틱</span>으로 이사했어요
            </h1>
            <p className='mt-2.5 max-w-[480px] text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
              여기 있던 글 전부와 새 글은 직접 만든 개발 블로그 플랫폼{" "}
              <strong className='font-semibold text-gray-800 dark:text-gray-200'>backtick.blog</strong>
              에서 볼 수 있어요. velog·기업 기술블로그 큐레이션과 AI 요약도 함께요.
            </p>
          </div>

          <div className='mt-7 flex flex-col gap-2.5 sm:flex-row'>
            <a
              href='https://backtick.blog/@theo'
              className='inline-flex items-center justify-center gap-1.5 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-85 dark:bg-white dark:text-gray-900'
            >
              백틱에서 글 보기
              <span aria-hidden>→</span>
            </a>
            <Link
              href='/profile'
              className='inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-2.5 text-sm font-bold text-gray-700 transition hover:border-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-white'
            >
              프로필 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
