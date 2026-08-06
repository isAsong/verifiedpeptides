// app/products/page.jsx
import { productCategories, products } from '@/lib/data/products';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/common/CategoryFilter';
import Pagination from '@/components/common/Pagination';
import { Suspense } from 'react';

const PRODUCTS_PER_PAGE = 9;

// ============================================================
// ✅ SEO: 动态生成页面元数据
// ============================================================
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || '';
  const page = parseInt(params?.page) || 1;

  // 基础配置
  const baseTitle = 'Research Peptides | verifiedpeptides';
  const baseDescription = 'Browse our catalog of high-purity research peptides for laboratory and scientific research. All products come with Certificates of Analysis (COAS).';

  // 如果是首页（无分类筛选）
  if (!category) {
    return {
      title: `Research Peptides ${page > 1 ? `- Page ${page}` : ''}`,
      description: `Discover premium research peptides including Tirzepatide, Retatrutide, Semaglutide and more. Rigorously tested, independently verified.${page > 1 ? ` Page ${page}.` : ''}`,
      alternates: {
        canonical: `https://verifiedpeptides.vip/products${page > 1 ? `?page=${page}` : ''}`,
      },
    };
  }

  // 带分类筛选的页面
  const categoryLabel = category;
  const categoryCount = products.filter(p => p.category === category).length;

  return {
    title: `${categoryLabel} Research Peptides ${page > 1 ? `- Page ${page}` : ''}`,
    description: `Shop high-quality ${categoryLabel} research peptides for your lab. ${categoryCount} products available with full COAS and third-party testing.${page > 1 ? ` Page ${page}.` : ''}`,
    alternates: {
      canonical: `https://verifiedpeptides.vip/products?category=${encodeURIComponent(category)}${page > 1 ? `&page=${page}` : ''}`,
    },
  };
}

// ============================================================
// ✅ 页面组件
// ============================================================
export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || '';
  const page = parseInt(params?.page) || 1;

  // 分类筛选
  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  // 分页计算
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE) || 1;
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // 结构化数据（JSON-LD）- 产品列表页的 BreadcrumbList
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://verifiedpeptides.vip' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://verifiedpeptides.vip/products' },
      ...(category ? [{ '@type': 'ListItem', position: 3, name: category, item: `https://verifiedpeptides.vip/products?category=${encodeURIComponent(category)}` }] : []),
    ],
  };

  return (
    <>
      {/* ✅ 结构化数据（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="container mx-auto px-4 py-10">
        {/* ✅ 页面标题区 - 带分类描述 */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {category ? `${category} Research Peptides` : 'Our Products'}
          </h1>
          {category && (
            <p className="mt-2 text-gray-600">
              Browse our selection of {category.toLowerCase()} research peptides.
              All products are rigorously tested with full COAS.
            </p>
          )}
        </div>

        {/* 分类筛选器 */}
        <Suspense fallback={<div className="h-10 w-full bg-gray-200 animate-pulse rounded" />}>
          <CategoryFilter
            categories={productCategories}
            currentCategory={category}
          />
        </Suspense>

        {/* 产品列表 */}
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          <>
            {/* 产品总数提示 */}
            <p className="text-sm text-gray-500 mt-4">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} products
              {category && ` in "${category}"`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                category={category}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}