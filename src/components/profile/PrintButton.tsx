"use client";

import { FiPrinter } from "react-icons/fi";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="button button-secondary print-button">
      <FiPrinter size={16} aria-hidden="true" /> 이력서 인쇄
    </button>
  );
}
