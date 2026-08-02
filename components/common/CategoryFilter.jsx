// components/common/CategoryFilter.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CategoryFilter({ categories, currentCategory }) {
  const pathname = usePathname();

  const getCategoryUrl = (category) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href={pathname}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          !currentCategory
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={getCategoryUrl(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            currentCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}