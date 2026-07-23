"use client";

import { Article } from "@/types/article";
import MarkdownView from "./MarkdownView";
import { tagColor } from "@/constants/tagColors";
import clsx from "clsx";
import { useHeaderTitleStore } from "@/stores/headerTitle";
import { useEffect, useRef } from "react";
import useScrollOverElement from "@/hooks/useScrollOverElement";

export default function ArticleView({ article }: { article: Article }) {
  const { setTitle, clearTitle, isShowTitle } = useHeaderTitleStore();

  const titleRef = useRef<HTMLDivElement>(null);

  const isOver = useScrollOverElement(titleRef);

  useEffect(() => {
    if (article.title) {
      setTitle(article.title);
    }
    return () => clearTitle();
  }, [article.title, clearTitle, setTitle]);

  useEffect(() => {
    isShowTitle(isOver);
  }, [isShowTitle, isOver]);

  return (
    <article className='flex flex-col gap-8'>
      {/* 헤더 섹션 */}
      <div className='flex flex-col gap-5 pb-8 border-b border-gray-100 dark:border-gray-800'>
        <div className='flex flex-wrap gap-2'>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className={clsx(
                "rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
                tagColor(tag)
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <h1
          className='text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight'
          ref={titleRef}
        >
          {article.title}
        </h1>
        <time className='text-sm font-medium text-gray-400 dark:text-gray-500'>
          {article.date}
        </time>
      </div>

      {/* 콘텐츠 섹션 */}
      <div className='prose-wrapper'>
        <MarkdownView contentHtml={article.content} />
      </div>
    </article>
  );
}
