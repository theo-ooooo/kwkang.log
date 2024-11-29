"use client";
import { useRef } from "react";
import Tag from "./Tag";
import useSeletedTag from "@/hooks/useSeletedTag";
import useActiveChildElementScroll from "@/hooks/useActiveChildElementScroll";

export default function TagSeletor({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedTag, handleClick } = useSeletedTag();

  useActiveChildElementScroll({
    containerRef,
    activeIndex: tags.indexOf(selectedTag),
  });
  return (
    <div
      ref={containerRef}
      className='flex gap-1 py-2 overflow-x-auto sticky top-[62px] bg-white dark:bg-black items-center '
    >
      {tags.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          onClick={handleClick}
          isSelected={selectedTag === tag}
        />
      ))}
    </div>
  );
}
