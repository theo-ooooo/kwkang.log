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
  }, []);

  useEffect(() => {
    isShowTitle(isOver);
  }, [isOver, isShowTitle, article.title, clearTitle]);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <div className='text-2xl font-bold md:text-3xl' ref={titleRef}>
          {article.title}
        </div>
        <div className='flex justify-between'>
          <div className='text-sm text-zinc-400'>{article.date}</div>
          <div className='flex gap-2 text-sm text-zinc-400'>
            {article.tags.map((tag) => {
              return (
                <span key={tag} className={`text-xs font-semibold rounded`}>
                  {tag.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <MarkdownView contentHtml={article.content} />
    </div>
  );
}
