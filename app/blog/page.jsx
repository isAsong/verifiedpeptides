// app/blog/page.jsx
import { Suspense } from 'react';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';
import CategoryFilter from '@/components/common/CategoryFilter';
import Pagination from '@/components/common/Pagination';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Blog',
  description: 'Read the latest research insights from verifiedpeptides.',
};

const POSTS_PER_PAGE = 6; // 每页显示 6 篇文章

export default async function BlogPage({ searchParams }) {
  // ✅ 必须 await 解析 searchParams
  const params = await searchParams;
  const category = params?.category || '';
  const page = parseInt(params?.page) || 1;

  // 获取所有文章（按分类筛选）
  const filteredPosts = getPostsByCategory(category);
  const categories = getAllCategories();

  // 分页计算
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / POSTS_PER_PAGE) || 1;
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // 用于分页组件保留分类参数
  const basePath = `/blog${category ? `?category=${encodeURIComponent(category)}` : ''}`;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {/* 分类筛选器（用 Suspense 包裹） */}
      <Suspense fallback={<div className="h-10 w-full bg-gray-100 animate-pulse rounded" />}>
        <CategoryFilter
          categories={categories}
          currentCategory={category}
          basePath="/blog"
        />
      </Suspense>

      {/* 文章列表 */}
      {paginatedPosts.length === 0 ? (
        <p className="text-gray-500 mt-6">No articles found in this category.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {paginatedPosts.map((post) => (
              <article key={post.slug} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                {post.image && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {post.category} • {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-3">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">#{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* 分页组件 */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={basePath}
            />
          )}
        </>
      )}
    </div>
  );
}