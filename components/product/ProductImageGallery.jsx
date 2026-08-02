'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ProductImageGallery({ images, productName, autoPlayInterval = 3000 }) {


  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  const validImages = Array.isArray(images) && images.length > 0 ? images : [];

  if (validImages.length === 0) {

    return (
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
      </div>
    );
  }

  const goTo = (index) => {
    const total = validImages.length;
    let newIndex = index;
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;

    setSelectedIndex(newIndex);
  };

  const next = () => {

    goTo(selectedIndex + 1);
  };

  const prev = () => {
  
    goTo(selectedIndex - 1);
  };

  const handleThumbClick = (idx) => {
 
    goTo(idx);
    setIsPlaying(true);
  };

  // 自动轮播
  useEffect(() => {
    if (isPlaying && validImages.length > 1) {
      timerRef.current = setInterval(() => {
   
        goTo(selectedIndex + 1);
      }, autoPlayInterval);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, selectedIndex, autoPlayInterval, validImages.length]);

  const currentImage = validImages[selectedIndex] || validImages[0];

  return (
    <div
      className="relative"
      onMouseEnter={() => {
  
        setIsPlaying(false);
      }}
      onMouseLeave={() => {
   
        setIsPlaying(true);
      }}
    >
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
        <Image
          key={selectedIndex}
          src={currentImage}
          alt={productName || 'Product'}
          fill
          className="object-contain"
          priority
        />

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
       
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-20 transition-colors"
              aria-label="上一张"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-20 transition-colors"
              aria-label="下一张"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThumbClick(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === selectedIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`转到图片 ${idx+1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {validImages.map((img, idx) => {
            const imgSrc = typeof img === 'string' ? img : img?.src || '';
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleThumbClick(idx);
                }}
                className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                  idx === selectedIndex ? 'border-blue-600 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'
                }`}
                aria-label={`缩略图 ${idx+1}`}
              >
                <Image src={imgSrc} alt={`缩略图 ${idx+1}`} fill className="object-cover pointer-events-none" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}