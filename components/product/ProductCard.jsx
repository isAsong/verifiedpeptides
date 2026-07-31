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
        <Image
          src={mainImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={id <= 3}
        />
        {/* WhatsApp 图标 */}
        <div className="absolute bottom-3 right-3 z-10">
          <a
            href="#"
            className="block w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
            aria-label="Contact via WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
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