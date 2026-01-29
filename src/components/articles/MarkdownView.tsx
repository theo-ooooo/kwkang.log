"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import slug from "rehype-slug";
import raw from "rehype-raw";
import { PluggableList } from "unified";

export default function MarkdownView({ contentHtml }: { contentHtml: string }) {
  return (
    <div className='!w-full prose prose-sm md:prose-base max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-950 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800 dark:prose-pre:border-gray-700 prose-pre:rounded-xl prose-pre:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:rounded-r prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-gray-500 dark:prose-li:marker:text-gray-400'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[raw, slug] as PluggableList}
        components={{
          code({ className, children, ...rest }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag='div'
                style={dracula}
                customStyle={{
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded text-sm font-medium' {...rest}>{children}</code>
            );
          },
        }}
      >
        {contentHtml}
      </ReactMarkdown>
    </div>
  );
}
