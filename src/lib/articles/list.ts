import { POST_DIRECTORY } from "@/constants/directories";
import fs from "fs";
import RemoveMarkdown from "remove-markdown";

import { GetMarkdown } from "../viewer/markdown";

export function getArticlesPaths() {
  try {
    const directories = fs.readdirSync(POST_DIRECTORY);

    return directories.flatMap((directory) => {
      const fileNames = fs.readdirSync(`${POST_DIRECTORY}/${directory}`);

      return fileNames.map((fileName) => {
        const id = fileName.replace(".md", "");
        const data = GetMarkdown({
          directory: `${POST_DIRECTORY}/${directory}`,
          id,
        });

        return {
          ...data,
          route: `/articles/${directory}/${id}`,
          description: getArticleDescription(data.content),
        };
      });
    });
  } catch (e) {
    throw e;
  }
}

function getArticleDescription(content: string) {
  const contentLength = 200;
  const description = RemoveMarkdown(content).slice(0, contentLength);
  return description + "...";
}
