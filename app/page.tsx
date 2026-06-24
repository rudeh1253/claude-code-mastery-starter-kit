import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

// 빌드 타임에 정적으로 생성 (SSG)
export const dynamic = "force-static";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-neutral-500">아직 작성된 포스트가 없습니다.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
