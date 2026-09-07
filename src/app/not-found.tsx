import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="status-page">
      <p className="status-code" aria-hidden="true">404<span>.</span></p>
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>페이지를 찾을 수 없어요.</h1>
      <p className="status-description">주소가 바뀌었거나 더 이상 제공하지 않는 페이지예요.</p>
      <Link href="/" className="button button-primary">홈으로 돌아가기 <FiArrowRight aria-hidden="true" /></Link>
    </section>
  );
}
