import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data/products';
import { getAllPosts } from '@/lib/posts';
import ProductCard from '@/components/product/ProductCard';

export const metadata = {
  title: 'Home - verifiedpeptides',
  description: 'High-purity research peptides for laboratory and scientific research. Shop Tirzepatide, Retatrutide, Semaglutide and more.',
};

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);
  const latestPosts = getAllPosts().slice(0, 3);

  // 信任标识数据
  const trustBadges = [
    { icon: '🏆', label: '14+ Years Experience', desc: 'Trusted peptide manufacturer with decades of expertise' },
    { icon: '🔬', label: '99%+ Purity', desc: 'Rigorously tested by independent third-party labs' },
    { icon: '📋', label: 'Full COA Disclosure', desc: 'Every batch comes with complete Certificates of Analysis' },
    { icon: '🌍', label: 'Global Shipping', desc: 'Fast, discreet delivery to researchers worldwide' },
  ];

  // 质量保证步骤
  const qualitySteps = [
    { step: '01', title: 'High-Purity Water', desc: 'Ultra-pure water used in all synthesis processes' },
    { step: '02', title: 'Sterile Filtration', desc: 'Multi-stage filtration ensuring contaminant-free product' },
    { step: '03', title: 'Precise Vialing', desc: 'Accurate dosage in every vial with zero variance' },
    { step: '04', title: 'Freeze-Drying', desc: 'Advanced lyophilization for maximum stability and shelf life' },
  ];

  // 客户评价
  const testimonials = [
    {
      quote: 'Their WhatsApp customer support is top-notch. I reached out via the live chat icon to ask about batch availability, and a real lab representative responded within minutes with the full pricing catalog and latest test reports.',
      author: 'Ethan W.',
      role: 'Biohacking Enthusiast',
    },
    {
      quote: 'We\'ve placed three bulk orders this year. Every single batch remains consistent, and the fact that they lock the Janoshik verification directly gives us immense confidence.',
      author: 'Sarah T.',
      role: 'Biotech Lab Coordinator',
    },
    {
      quote: 'Outstanding logistics. Shipping domestic or international peptides can be a headache with customs, but they handled the freight flawlessly. My bulk order arrived in less than 9 days.',
      author: 'Dr. Marcus V.',
      role: 'Clinic Director, Texas',
    },
  ];

  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section className="relative w-full h-[90vh] min-h-[600px] max-h-[800px] overflow-hidden">
        <Image
          src="/images/banner-home.png"
          alt="verifiedpeptides - Research Peptides"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-4 md:px-12 lg:px-20">
          <div className="max-w-2xl text-white">
            {/* 闪烁的信任标签 */}
            <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-1.5 mb-6 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-medium">Trusted Since 2012 · 14+ Years Experience</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              High-Purity Research
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Peptides
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8 leading-relaxed">
              Rigorously tested, independently verified research peptides with
              full Certificates of Analysis for every batch.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group relative px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
              >
                Explore Products
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/coas"
                className="px-8 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                View COAS
              </Link>
            </div>

            {/* 统计数字 */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Research Peptides</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99%+</div>
                <div className="text-sm text-gray-400">Purity Guaranteed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-sm text-gray-400">Happy Researchers</div>
              </div>
            </div>
          </div>
        </div>

        {/* 滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== Trust Badges ===== */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {badge.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{badge.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Products ===== */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Bestsellers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">Featured Products</h2>
          </div>
          <Link href="/products" className="group text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== Quality Assurance Process ===== */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Quality Assurance</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-1">Innovation Meets Purity</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Every peptide undergoes rigorous quality control at every stage —
              from synthesis to your laboratory bench.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualitySteps.map((item, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                {/* 步骤数字 - 提高不透明度和亮度 */}
                <div className="text-4xl font-bold text-blue-300/60 group-hover:text-blue-300/80 transition-colors duration-300">
                  {item.step}
                </div>
                {/* 标题 - 添加白色，确保可见 */}
                <h3 className="text-lg font-semibold text-white mt-2">
                  {item.title}
                </h3>
                {/* 描述 - 提升对比度 */}
                <p className="text-gray-300 text-sm mt-1">
                  {item.desc}
                </p>
                <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* 引用图标 */}
                <div className="text-4xl text-blue-400/30 group-hover:text-blue-400/50 transition-colors duration-300">
                  "
                </div>
                <p className="text-gray-700 leading-relaxed mt-2">
                  {testimonial.quote}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Latest Blog ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Insights</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">Latest Research Insights</h2>
            </div>
            <Link href="/blog" className="group text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <div
                key={post.slug}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                {post.image && (
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Advance Your Research?
          </h2>
          {/* 🔥 将描述文字改为更亮的 blue-100，增强对比度 */}
          <p className="text-blue-100 max-w-xl mx-auto mb-8">
            Browse our catalog of high-purity research peptides with full
            transparency and third-party verification.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}