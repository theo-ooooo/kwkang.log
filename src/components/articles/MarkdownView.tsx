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
    <div className='!w-full !max-w-[768px] prose dark:prose-invert'>
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
                // {...rest}
                style={dracula}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest}>{children}</code>
            );
          },
        }}
      >
        {contentHtml}
      </ReactMarkdown>
    </div>
  );
}
