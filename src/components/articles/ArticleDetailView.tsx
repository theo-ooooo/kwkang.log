"use client";

import { Article } from "@/types/article";
import MarkdownView from "./MarkdownView";
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
      <div className='flex flex-col gap-6 pb-8 border-b border-gray-200 dark:border-gray-800'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent leading-tight' ref={titleRef}>
            {article.title}
          </h1>
          <div className='flex justify-between items-center gap-4 flex-wrap'>
            <div className='text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800'>
              {article.date}
            </div>
            <div className='flex gap-2 flex-wrap'>
              {article.tags.map((tag) => {
                return (
                  <span 
                    key={tag} 
                    className='px-3 py-1.5 text-xs font-bold rounded-full text-gray-700 dark:text-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-800/50 shadow-sm'
                  >
                    {tag.toUpperCase()}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* 콘텐츠 섹션 */}
      <div className='prose-wrapper'>
        <MarkdownView contentHtml={article.content} />
      </div>
    </article>
  );
}
