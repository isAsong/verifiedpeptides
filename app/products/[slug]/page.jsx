// app/products/[slug]/page.js
import { notFound } from 'next/navigation';

import Link from 'next/link';
import { getProductBySlug } from '@/lib/data/products';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductPurchase from '@/components/product/ProductPurchase';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return {
    title: `${product.name} | verifiedpeptides`,
    description: product.description?.slice(0, 160) || '',
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160) || '',
      images: product.images || [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images = product.images?.length > 0 ? product.images : [product.image];
  // 获取第一条 FAQ（如果有）
  const firstFaq = product.faqs && product.faqs.length > 0 ? product.faqs[0] : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 面包屑 */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.shortName || product.name}</span>
      </nav>

      {/* 主内容区：图片 + 信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：图片 */}
        <ProductImageGallery
          images={product.images}
          productName={product.name}
          autoPlayInterval={4000} // 可选，默认3000ms
        />

        {/* 右侧：产品信息 + FAQ摘要 + 描述 + 按钮 */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
          {product.rating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 >= 0.5 && '★'}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount || 0} reviews)</span>
            </div>
          )}

          {/* 插入 FAQ 摘要（原本价格的位置） */}
          {firstFaq && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800">{firstFaq.question}</h3>
              <p className="text-sm text-gray-700 mt-1">{firstFaq.answer}</p>
            </div>
          )}

          {/* 完整描述 */}
          <div className="mt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
            {product.description}
          </div>

          {/* WhatsApp 按钮 */}
          <ProductPurchase product={product} />
        </div>
      </div>

      {/* ===== 下方详细信息（规格、测试、产品信息、完整FAQ） ===== */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        {/* 产品规格表格 */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Product Specifications</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 font-medium text-gray-700 w-1/3">{key}</td>
                      <td className="px-4 py-2 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 测试报告 */}
        {product.testResults && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Test Results</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div><span className="font-medium">Date Tested:</span> {product.testResults.date}</div>
                <div><span className="font-medium">Purity:</span> {product.testResults.purity}</div>
                <div><span className="font-medium">Weight:</span> {product.testResults.weight}</div>
                <div><span className="font-medium">Endotoxins:</span> {product.testResults.endotoxins}</div>
                <div><span className="font-medium">TFA:</span> {product.testResults.tfa}</div>
                <div><span className="font-medium">Sterility:</span> {product.testResults.sterility}</div>
                <div className="col-span-2"><span className="font-medium">Batch #:</span> {product.testResults.batch}</div>
              </div>
            </div>
          </div>
        )}

        {/* 产品信息（CAS、序列等） */}
        {product.productInfo && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Product Information</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.productInfo).map(([key, value], idx) => {
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    return (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 font-medium text-gray-700 w-1/3">{label}</td>
                        <td className="px-4 py-2 text-gray-600 break-all">{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 完整 FAQ 列表（保留） */}
        {product.faqs && product.faqs.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {product.faqs.map((faq, idx) => (
                <details key={idx} className="border border-gray-200 rounded-lg">
                  <summary className="px-4 py-3 font-medium text-gray-800 cursor-pointer hover:bg-gray-50">
                    {faq.question}
                  </summary>
                  <div className="px-4 pb-3 text-gray-600">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}