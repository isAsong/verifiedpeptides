// app/products/page.jsx
import { productCategories, getProductsByCategory } from '@/lib/data/products';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/common/CategoryFilter';
import { Suspense } from 'react'; // 1. 引入 Suspense
export const metadata = {
    title: 'Products | Veritas Bio Labs',
    description: 'Browse our catalog of high-purity research peptides.',
};

export default function ProductsPage({ searchParams }) {
    const category = searchParams?.category || '';
    const filteredProducts = getProductsByCategory(category);

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Products
            </h1>
            {/* 2. 用 Suspense 包裹 CategoryFilter */}
            <Suspense fallback={<div className="h-10 w-full bg-gray-200 animate-pulse rounded" />}>
                <CategoryFilter
                    categories={productCategories}
                    currentCategory={category}
                    basePath="/products"
                />
            </Suspense>
            {
                filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500">No products found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )
            }
        </div >
    );
}