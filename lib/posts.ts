import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
};

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "1970-01-01",
    description: data.description ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  };
}

/** 모든 포스트 메타데이터를 최신순으로 반환합니다. */
export function getAllPosts(): PostMeta[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f));

  return files
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}

/** slug에 해당하는 단일 포스트를 반환합니다. 없으면 null. */
export function getPostBySlug(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    const fullPath = path.join(POSTS_DIR, `${slug}${ext}`);
    if (fs.existsSync(fullPath)) {
      return readPostFile(`${slug}${ext}`);
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
