// components/product/ProductCard.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const { id, name, description, image, images, category, slug } = product;

  // 取主图：优先 images[0]，其次 image，最后占位图
  const mainImage = images?.[0] || image || '/images/placeholder.jpg';
  // 链接：使用 slug 构造
  const href = slug ? `/products/${slug}` : '#';

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* 图片区域 */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={href} className="hover:text-blue-600 transition-colors">


          <Image
            src={mainImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={id <= 3}
          /> </Link>

      </div>

      {/* 文字信息 */}
      <div className="p-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
          <Link href={href} className="hover:text-blue-600 transition-colors">
            {name}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3 min-h-[4.5rem]">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <Link
            href={href}
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Read More
          </Link>
          {category && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}