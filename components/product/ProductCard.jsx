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
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* 图片区域：统一尺寸 + 统一内边距，object-contain 完整展示不裁剪 */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
        <Link
          href={href}
          className="block w-full h-full hover:text-blue-600 transition-colors"
          aria-label={name}
        >
          <Image
            src={mainImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
            priority={id <= 3}
          />
        </Link>
      </div>

      {/* 文字信息 */}
      <div className="p-3">
        <h2 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
          <Link href={href} className="hover:text-blue-600 transition-colors">
            {name}
          </Link>
        </h2>
        <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 min-h-[2rem]">
          {description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <Link
            href={href}
            className="inline-block px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            View {name}
          </Link>
          {category && (
            <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}