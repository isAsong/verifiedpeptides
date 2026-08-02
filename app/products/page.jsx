// app/products/page.jsx
import { productCategories, products } from '@/lib/data/products';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/common/CategoryFilter';
import Pagination from '@/components/common/Pagination';
import { Suspense } from 'react';

const PRODUCTS_PER_PAGE = 9;

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams; // ✅ 异步解析
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

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Our Products
      </h1>

      <Suspense fallback={<div className="h-10 w-full bg-gray-200 animate-pulse rounded" />}>
        <CategoryFilter
          categories={productCategories}
          currentCategory={category}
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

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </div>
  );
}