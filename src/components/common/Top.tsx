"use client";

import { useEffect, useState } from "react";
import { GoMoveToTop } from "react-icons/go";

export default function TopButton() {
  const [position, setPosition] = useState(0);
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    position > 0 && (
      <div
        className='fixed bottom-10 right-10 rounded-full cursor-pointer border-[1px] border-gray-300 p-3 hover:opacity-70'
        onClick={handleClick}
      >
        <GoMoveToTop size={30} />
      </div>
    )
  );
}
