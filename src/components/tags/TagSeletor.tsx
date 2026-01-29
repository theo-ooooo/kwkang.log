"use client";
import { memo, useRef } from "react";
import Tag from "./Tag";
import useSeletedTag from "@/hooks/useSeletedTag";
import useActiveChildElementScroll from "@/hooks/useActiveChildElementScroll";

const MemorizeTag = memo(Tag);

export default function TagSeletor({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedTag, handleClick } = useSeletedTag();

  const registerChildRef = useActiveChildElementScroll({
    containerRef,
    activeId: selectedTag,
  });

  return (
    <div
      ref={containerRef}
      className='flex gap-1 py-3 overflow-x-auto sticky top-[70px] bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 items-center z-40'
    >
      {tags.map((tag) => (
        <MemorizeTag
          key={tag}
          ref={(instance: HTMLElement) => registerChildRef(instance, tag)}
          tag={tag}
          onClick={handleClick}
          isSelected={selectedTag === tag}
        />
      ))}
    </div>
  );
}
