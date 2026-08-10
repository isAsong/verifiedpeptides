// app/blog/[slug]/page.js
import { notFound, permanentRedirect } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';

// 生成页面元数据（SEO）
export async function generateMetadata({ params }) {
  // ✅ 先 await params 获取 slug
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

// 文章详情页组件
export default async function ArticleDetailPage({ params }) {
  // ✅ 先 await params 获取 slug
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // 如果文章不存在，触发 404
  if (!post) {
    notFound();
  }

  // 规范化 slug：非文件名 slug 301 到文件名 slug，避免重复内容
  if (post.slug !== slug) {
    permanentRedirect(`/blog/${post.slug}`);
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Link href="/blog" className="inline-block mb-6 text-blue-600 hover:underline">
        ← Back to Blog
      </Link>

      <article>
        {/* 文章头 */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{post.category}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{post.title}</h1>
        </header>

        {/* 特色图片 */}
        {post.image && (
          <div className="relative w-full aspect-[16/9] rounded-lg shadow-md mb-8 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
              priority
            />
          </div>
        )}

        {/* 文章正文（从 Markdown 解析的 HTML） */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}