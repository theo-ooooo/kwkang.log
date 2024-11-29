"use client";

import useSeletedTag from "@/hooks/useSeletedTag";
import clsx from "clsx";

export default function Tag({ tag }: { tag: string }) {
  const { selectedTag, handleClick } = useSeletedTag();

  const isSeleted = tag === selectedTag;
  return (
    <div
      onClick={() => handleClick(tag)}
      className={clsx(
        "px-4 py-1 mx-1 mb-2 text-xs whitespace-pre duration-300 rounded-xl text-white cursor-pointer",
        { "font-bold bg-sky-400 dark:bg-neutral-500": isSeleted },
        { "font-semibold bg-sky-300 dark:bg-neutral-700": !isSeleted }
      )}
    >
      {tag.toUpperCase()}
    </div>
  );
}
