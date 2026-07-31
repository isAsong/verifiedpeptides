import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data/products';
import { getAllPosts } from '@/lib/posts';
import ProductCard from '@/components/product/ProductCard';

export const metadata = {
  title: 'Home - Veritas Bio Labs',
  description: 'High-purity research peptides for laboratory and scientific research. Shop Tirzepatide, Retatrutide, Semaglutide and more.',
};

export default function HomePage() {
  // 取前3个产品作为精选
  const featuredProducts = products.slice(0, 3);
  // 取最新3篇文章（getAllPosts 已按日期倒序）
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Banner */}
      <section className="relative w-full h-64 md:h-96 lg:h-[32rem] overflow-hidden">
        <Image
          src="/images/banner-home.jpg"
          alt="Veritas Bio Labs - Research Peptides"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Veritas Bio Labs
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            High-purity research peptides for breakthrough science
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* 精选产品 */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
          <Link href="/products" className="text-blue-600 hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 最新文章 */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Latest Research Insights</h2>
            <Link href="/blog" className="text-blue-600 hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <div key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                {post.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">
                    {post.category} • {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 可选：一个简短的 CTA 或者优势展示 */}
      <section className="py-12 container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Why Veritas Bio Labs?</h2>
          <p className="text-gray-600">
            We provide rigorously tested, high-purity peptides with full Certificates of Analysis (COAS) for every batch.
            Our products are trusted by researchers worldwide for consistency and reliability.
          </p>
        </div>
      </section>
    </>
  );
}