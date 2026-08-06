import Link from "next/link";

export const metadata = {
  title: "kwkang.log — 백틱으로 이사했어요",
  description: "블로그 글은 이제 백틱(backtick.blog)에서 만나요.",
};

export default function Home() {
  return (
    <div className='flex w-full flex-col py-14 sm:py-20'>
      {/* 백틱 이사 히어로 — backtick.blog 브랜드 카드 */}
      <div className='relative overflow-hidden rounded-[28px] bg-[#1a1815] px-7 py-14 text-center sm:px-12 sm:py-20'>
        {/* 은은한 코랄 글로우 */}
        <div
          aria-hidden
          className='pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e0533d]/25 blur-[90px]'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute -bottom-32 -right-16 h-64 w-64 rounded-full bg-[#e0533d]/10 blur-[80px]'
        />

        <div className='relative'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[.06] font-mono text-4xl font-semibold text-[#e0533d] ring-1 ring-white/10'>
            `
          </div>

          <p className='mt-7 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40'>
            kwkang.log → backtick.blog
          </p>
          <h1 className='mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]'>
            블로그가 <span className='text-[#e0533d]'>백틱</span>으로
            <br className='sm:hidden' /> 이사했어요
          </h1>
          <p className='mx-auto mt-4 max-w-[420px] text-[14px] leading-relaxed text-white/55 sm:text-[15px]'>
            여기 있던 글 전부와 새 글은 직접 만든 개발 블로그 플랫폼{" "}
            <strong className='font-bold text-white/85'>backtick.blog</strong>
            에서 볼 수 있어요.
          </p>

          <div className='mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <a
              href='https://backtick.blog/@theo'
              className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e0533d] px-7 py-3 text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(224,83,61,.35)] transition hover:bg-[#c9432f] sm:w-auto'
            >
              백틱에서 글 보기
              <span aria-hidden>→</span>
            </a>
            <Link
              href='/profile'
              className='inline-flex w-full items-center justify-center rounded-full border border-white/15 px-7 py-3 text-[14px] font-bold text-white/80 transition hover:border-white/40 hover:text-white sm:w-auto'
            >
              프로필 보기
            </Link>
          </div>

          <p className='mt-8 font-mono text-[11.5px] text-white/30'>
            velog · 기업 기술블로그 큐레이션 + AI 요약까지, 백틱에서
          </p>
        </div>
      </div>
    </div>
  );
}
