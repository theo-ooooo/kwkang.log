"use client";

import Link from "next/link";
import { FiRefreshCw } from "react-icons/fi";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="status-page">
      <p className="status-code" aria-hidden="true">Oops<span>.</span></p>
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>페이지를 불러오지 못했어요.</h1>
      <p className="status-description">잠시 후 다시 시도해 주세요.</p>
      <div className="button-row">
        <button type="button" onClick={reset} className="button button-primary"><FiRefreshCw aria-hidden="true" /> 다시 시도</button>
        <Link href="/" className="button button-secondary">홈으로 돌아가기</Link>
      </div>
    </section>
  );
}
