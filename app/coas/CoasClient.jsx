// components/CoasClient.jsx
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/data/coas';
import { WHATSAPP_NUMBER } from '@/lib/config';

const MONTH_GROUPS_PER_PAGE = 3;

export default function CoasClient({ initialMonthGroups }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);

  const closePreview = () => setPreviewImage(null);

  // 提取所有可用年份
  const availableYears = useMemo(() => {
    const years = new Set();
    initialMonthGroups.forEach(group => {
      const year = group.month?.split('-')[0];
      if (year) years.add(year);
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [initialMonthGroups]);

  // 按年份筛选月份组
  const filteredMonthGroups = useMemo(() => {
    if (!selectedYear) return initialMonthGroups;
    return initialMonthGroups.filter(group => {
      const year = group.month?.split('-')[0];
      return year === selectedYear;
    });
  }, [initialMonthGroups, selectedYear]);

  // 分页
  const totalPages = Math.ceil(filteredMonthGroups.length / MONTH_GROUPS_PER_PAGE) || 1;
  const currentPageClamped = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (currentPageClamped - 1) * MONTH_GROUPS_PER_PAGE;
  const endIndex = startIndex + MONTH_GROUPS_PER_PAGE;
  const paginatedMonthGroups = filteredMonthGroups.slice(startIndex, endIndex);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };

  return (
    <>
      {/* 年份筛选按钮 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleYearChange('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            !selectedYear
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Years
        </button>
        {availableYears.map((year) => (
          <button
            key={year}
            onClick={() => handleYearChange(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedYear === year
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* COA 列表 */}
      {paginatedMonthGroups.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No COAs found for this year.</p>
        </div>
      ) : (
        <>
          <div className="space-y-10">
            {paginatedMonthGroups.map((group) => (
              <div key={group.month}>
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                  {formatMonth(group.month)}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.coas.map((coa) => {
                    const imagePath = coa.images?.[0]?.localPath || null;
                    return (
                      <div
                        key={coa.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {imagePath && (
                          <div
                            className="relative w-full aspect-[4/3] bg-gray-100 cursor-pointer overflow-hidden"
                            onClick={() => setPreviewImage(imagePath)}
                          >
                            <Image
                              src={imagePath}
                              alt={`COA for ${coa.productName}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-contain hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                              <svg
                                className="w-10 h-10 text-white opacity-0 hover:opacity-80 transition-opacity"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0l3-3m-3 3l-3-3"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="p-3">
                          <span className="font-medium text-gray-800 text-sm">
                            {coa.productName}
                          </span>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {coa.purity && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {coa.purity}
                              </span>
                            )}
                            {coa.batchNumber && (
                              <span className="text-xs text-gray-500">Batch: {coa.batchNumber}</span>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-gray-400">
                            {coa.testDate && formatDate(coa.testDate)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPageClamped - 1)}
                  disabled={currentPageClamped === 1}
                  className={`px-3 py-2 rounded border ${
                    currentPageClamped === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  &larr;
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPageClamped} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPageClamped + 1)}
                  disabled={currentPageClamped === totalPages}
                  className={`px-3 py-2 rounded border ${
                    currentPageClamped === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  &rarr;
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* WhatsApp 联系 */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
        <p className="mt-1">
          Need a specific COA?{' '}
          <a
            href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hello%2C%20I%20need%20a%20specific%20COA`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Contact us on WhatsApp
          </a>
        </p>
      </div>

      {/* 图片预览弹窗 */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closePreview}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={previewImage}
              alt="COA Preview"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
            />
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <a
              href={previewImage}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Open full size
            </a>
          </div>
        </div>
      )}
    </>
  );
}