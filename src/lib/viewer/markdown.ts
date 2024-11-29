import matter from "gray-matter";
import path from "path";
import fs from "fs";

export function GetMarkdown({
  directory,
  id,
}: {
  directory: string;
  id: string;
}) {
  const fullPath = path.join(directory, `${id}.md`);

  try {
    const markdownContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(markdownContents);

    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      content: matterResult.content,
      tags: (matterResult.data.tag as string)
        .split(",")
        .map((tag) => tag.trim()),
    };
  } catch (e) {
    throw e;
  }
}
