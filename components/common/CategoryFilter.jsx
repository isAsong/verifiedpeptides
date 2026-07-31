// components/common/CategoryFilter.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories, currentCategory, basePath }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (category) => {
    // 构建新的查询参数
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    // 跳转到新 URL
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => handleSelect('')}
        className={`px-4 py-2 text-sm rounded-full transition-colors ${
          !currentCategory
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={`px-4 py-2 text-sm rounded-full transition-colors ${
            currentCategory === cat
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}