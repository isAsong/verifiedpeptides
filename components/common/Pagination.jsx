// components/common/Pagination.jsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', pageNumber);
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const delta = 2;
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

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`px-3 py-2 rounded border ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        &larr;
      </Link>

      {getPageNumbers().map((page, idx) => {
        if (page === '...') {
          return (
            <span key={`dots-${idx}`} className="px-3 py-2">
              …
            </span>
          );
        }
        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`px-4 py-2 rounded border ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={createPageUrl(currentPage + 1)}
        className={`px-3 py-2 rounded border ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        &rarr;
      </Link>
    </div>
  );
}