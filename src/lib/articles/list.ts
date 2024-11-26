import { ARTICLE_DIRECTORY } from "@/constants/directories";
import fs from "fs";
import RemoveMarkdown from "remove-markdown";

import { GetMarkdown } from "../viewer/markdown";
import { Article } from "@/types/article";

export function getArticlesPaths(): Article[] {
  try {
    const directories = fs.readdirSync(ARTICLE_DIRECTORY);

    return directories.flatMap((directory) => {
      const fileNames = fs.readdirSync(`${ARTICLE_DIRECTORY}/${directory}`);

      return fileNames.map((fileName) => {
        const id = fileName.replace(".md", "");
        const data = GetMarkdown({
          directory: `${ARTICLE_DIRECTORY}/${directory}`,
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

export function getAllArtclesPath() {
  const getArticles = getArticlesPaths();

  const paths = getArticles.map((article) => {
    if (!article.route) {
      return { parmas: {} };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, __, directory, fileName] = article.route.split("/");

    const id = fileName.replace(".md", "");

    return {
      params: { id, directory },
    };
  });
  return paths;
}

export function getArticleDescription(content: string) {
  const contentLength = 200;
  const description = RemoveMarkdown(content).slice(0, contentLength);
  return description + "...";
}