"use client";

import { FiPrinter } from "react-icons/fi";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="rs-btn rs-btn-primary">
      <FiPrinter size={16} aria-hidden="true" /> 인쇄, PDF 저장
    </button>
  );
}
