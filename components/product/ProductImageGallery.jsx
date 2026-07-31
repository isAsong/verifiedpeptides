// components/product/ProductImageGallery.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductImageGallery({ images, productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No image
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 主图 */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
        <Image
          src={images[selectedIndex] || images[0]}
          alt={productName}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* 缩略图 */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition ${
                selectedIndex === idx ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}