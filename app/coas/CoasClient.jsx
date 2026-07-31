'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCoasByMonth, formatMonth, formatDate } from '@/lib/data/coas';

export default function CoasClient({ months, productSlugMap }) {
    const [previewImage, setPreviewImage] = useState(null);

    const closePreview = () => setPreviewImage(null);

    return (
        <>
            {/* COAS 列表 */}
            <div className="space-y-10">
                {months.map((month) => {
                    const coas = getCoasByMonth(month);
                    const monthLabel = formatMonth(month);

                    return (
                        <div key={month}>
                            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                                {monthLabel}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {coas.map((coa) => {
                                    const productSlug = productSlugMap[coa.productId];
                                    const productLink = productSlug ? `/products/${productSlug}` : null;
                                    // 取第一张图片的本地路径
                                    const imagePath = coa.images?.[0]?.localPath || null;

                                    return (
                                        <div
                                            key={coa.id}
                                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                                        >
                                            {/* 图片 - 点击预览 */}
                                            {imagePath && (
                                                <div
                                                    className="relative w-full aspect-[4/3] bg-gray-100 cursor-pointer overflow-hidden"
                                                    onClick={() => setPreviewImage(imagePath)}
                                                >
                                                    <Image
                                                        src={imagePath}
                                                        alt={`COA for ${coa.productName}`}
                                                        fill
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

                                            {/* 信息区域 */}
                                            <div className="p-3">
                                                {productLink ? (
                                                    <Link href={productLink} className="font-medium text-blue-600 hover:underline text-sm">
                                                        {coa.productName}
                                                    </Link>
                                                ) : (
                                                    <span className="font-medium text-gray-800 text-sm">{coa.productName}</span>
                                                )}
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
                                                <div className="mt-1 text-xs text-gray-400">{formatDate(coa.testDate)}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
                <p className="mt-1">
                    Need a specific COA?{' '}
                    <a
                        href="https://api.whatsapp.com/send?phone=85270460355&text=Hello%2C%20I%20need%20a%20specific%20COA"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closePreview}>
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <img src={previewImage} alt="COA Preview" className="w-full h-full object-contain" />
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