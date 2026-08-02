// app/products/page.jsx
import { productCategories, getProductsByCategory, products } from '@/lib/data/products';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/common/CategoryFilter';
import Pagination from '@/components/common/Pagination';
import { Suspense } from 'react';

export const metadata = {
  title: 'Products | Veritas Bio Labs',
  description: 'Browse our catalog of high-purity research peptides.',
};

const PRODUCTS_PER_PAGE = 9;

export default function ProductsPage({ searchParams }) {
  // 获取分类和页码参数
  const category = searchParams?.category || '';
  const page = parseInt(searchParams?.page) || 1;

  // 根据分类筛选（若无分类则返回全部）
  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  // 计算分页
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);
  const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // 构建基础 URL（保留分类参数）
  const basePath = `/products?category=${encodeURIComponent(category)}`;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Our Products
      </h1>

      <Suspense fallback={<div className="h-10 w-full bg-gray-200 animate-pulse rounded" />}>
        <CategoryFilter
          categories={productCategories}
          currentCategory={category}
          basePath="/products"
        />
      </Suspense>

      {paginatedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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