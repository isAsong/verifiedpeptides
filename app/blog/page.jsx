import { Suspense } from 'react';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';
import CategoryFilter from '@/components/common/CategoryFilter';
import Link from 'next/link';

export const metadata = {
  title: 'Blog',
  description: 'Read the latest research insights from Veritas Bio Labs.',
};

export default function BlogPage({ searchParams }) {
  const category = searchParams?.category || '';
  const filteredPosts = getPostsByCategory(category);
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      
      {/* 用 Suspense 包裹 CategoryFilter */}
      <Suspense fallback={<div className="h-10 w-full bg-gray-100 animate-pulse rounded" />}>
        <CategoryFilter
          categories={categories}
          currentCategory={category}
          basePath="/blog"
        />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            {post.image && (
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
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

      {filteredPosts.length === 0 && (
        <p className="text-gray-500 mt-6">No articles found in this category.</p>
      )}
    </div>
  );
}