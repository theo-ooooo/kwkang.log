import matter from "gray-matter";
import path from "path";
import fs from "fs";

export async function GetMarkdown({
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
    };
  } catch (e) {
    throw e;
  }
}
