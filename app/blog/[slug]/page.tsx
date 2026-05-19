import { samplePosts } from "@/lib/data/site";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = samplePosts.find((item) => item.slug === slug);
  if (!post) return <div className="mx-auto max-w-3xl px-4 py-10">Post not found.</div>;
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-sm">Estimated reading time: {post.minutes} min</p>
      <section className="prose mt-6 dark:prose-invert"><p>Expert-reviewed comparison content with source citations and updated timestamps for EEAT compliance.</p></section>
    </article>
  );
}
