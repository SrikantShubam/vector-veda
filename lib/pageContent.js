import fs from "fs";
import path from "path";
import { renderMarkdownToHtml } from "./markdown";

let matter = null;
try {
  // eslint-disable-next-line global-require
  matter = require("gray-matter");
} catch (_) {
  matter = null;
}

function readPageFile(slug) {
  const filePath = path.join(process.cwd(), "content", "pages", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  if (matter) {
    const parsed = matter(raw);
    return {
      title: parsed.data?.title || slug,
      body: parsed.content || ""
    };
  }
  const frontmatterMatch = raw.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+/);
  let title = slug;
  let body = raw;
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/^\s*title:\s*(.+)\s*$/m);
    if (titleMatch) {
      title = titleMatch[1].replace(/^["']|["']$/g, "").trim();
    }
    body = raw.slice(frontmatterMatch[0].length);
  }
  return { title, body };
}

export function getPageContent(slug) {
  const { title, body } = readPageFile(slug);
  return {
    title,
    body,
    html: renderMarkdownToHtml(body)
  };
}
