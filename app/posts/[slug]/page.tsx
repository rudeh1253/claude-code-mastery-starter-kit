import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

// 모든 slug를 빌드 타임에 정적 생성 (SSG)
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
  },
};

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Back
      </Link>
      <header className="mt-4 mb-8">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time className="text-sm text-neutral-500" dateTime={post.date}>
          {post.date}
        </time>
      </header>
      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>
    </article>
  );
}
