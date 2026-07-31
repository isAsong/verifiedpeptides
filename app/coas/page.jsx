// app/coas/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllMonths, getCoasByMonth, formatMonth, formatDate } from '@/lib/data/coas';
import { products } from '@/lib/data/products';
import CoasClient from './CoasClient';  // 稍后创建

// ✅ metadata 在服务端组件中正常工作
export const metadata = {
  title: 'COAS - Certificates of Analysis | Veritas Bio Labs',
  description: 'Browse our archive of published peptide Certificates of Analysis (COAS) with purity, weight, and batch details.',
};

export default function CoasPage() {
  const months = getAllMonths();

  // 构建产品 slug 映射（用于跳转）
  const productSlugMap = {};
  products.forEach(p => {
    productSlugMap[p.id] = p.slug;
  });

  // 把数据传给客户端组件
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* 页面标题 - 服务端渲染 */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Certificates of Analysis
        </h1>
        <p className="mt-2 text-gray-600">
          Browse our archive of published peptide COAS. All products are tested
          for purity, weight, and quality assurance.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {months.length} months of test results available
        </p>
      </div>

      {/* ✅ 客户端交互部分交给子组件 */}
      <CoasClient months={months} productSlugMap={productSlugMap} />
    </div>
  );
}