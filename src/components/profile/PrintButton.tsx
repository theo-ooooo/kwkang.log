"use client";

import { FaFilePdf } from "react-icons/fa";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all print:hidden"
      aria-label="PDF로 저장"
    >
      <FaFilePdf size={18} />
      <span className="font-medium">PDF 저장</span>
    </button>
  );
}

