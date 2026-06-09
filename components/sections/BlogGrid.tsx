import { BlogCard } from "@/components/shared/BlogCard";
import type { BlogPost } from "@/types";

interface BlogGridProps {
  posts: BlogPost[];
}

/** 3-col grid of blog cards. Static list render — Server Component. */
export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return <p className="text-body">No posts yet — check back soon.</p>;
  }
  return (
    <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <BlogCard post={post} />
        </li>
      ))}
    </ul>
  );
}
