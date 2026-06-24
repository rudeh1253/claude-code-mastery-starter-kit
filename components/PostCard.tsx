import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <h2 className="text-lg font-semibold group-hover:underline">
          {post.title}
        </h2>
        <time className="text-sm text-neutral-500" dateTime={post.date}>
          {post.date}
        </time>
        {post.description && (
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </Link>
    </article>
  );
}
