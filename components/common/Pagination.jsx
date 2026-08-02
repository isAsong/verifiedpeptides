// components/common/Pagination.jsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * 生成分页 URL，保留所有现有查询参数（如 category）
   */
  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    // 如果是第一页，移除 page 参数（更干净的 URL）
    if (pageNumber === 1) {
      params.delete('page');
    } else {
      params.set('page', String(pageNumber));
    }
    return `${pathname}?${params.toString()}`;
  };

  /**
   * 生成页码数组（带省略号）
   * 例如: [1, 2, 3, '...', 8, 9, 10]
   */
  const getPageNumbers = () => {
    const delta = 2; // 当前页前后显示 2 页
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  // 只有一页时不显示分页
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex justify-center items-center space-x-1.5 mt-8"
      aria-label="Pagination"
    >
      {/* 上一页 */}
      <Link
        href={createPageUrl(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
        }`}
      >
        <span className="sr-only">Previous</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* 页码按钮 */}
      {pageNumbers.map((page, idx) => {
        if (page === '...') {
          return (
            <span
              key={`dots-${idx}`}
              className="px-2 py-2 text-sm text-gray-400"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors min-w-[40px] text-center ${
              isActive
                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </Link>
        );
      })}

      {/* 下一页 */}
      <Link
        href={createPageUrl(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
        }`}
      >
        <span className="sr-only">Next</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  );
}