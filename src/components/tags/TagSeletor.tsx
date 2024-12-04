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
      className='flex gap-1 py-2 overflow-x-auto sticky top-[62px] bg-white dark:bg-black items-center '
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
