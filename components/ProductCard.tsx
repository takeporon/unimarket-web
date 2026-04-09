'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  liked?: boolean;
  onLikeToggle?: (id: string) => void;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  imageUrl,
  liked = false,
  onLikeToggle,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onLikeToggle?.(id);
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
        {/* Product Image */}
        <div className="relative w-full h-40 bg-gray-300">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLikeClick();
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Heart
              size={20}
              className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-3">
          <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-1">{description}</p>
          <p className="text-lg font-bold text-gray-900 mt-2">{price.toLocaleString()}円</p>
        </div>
      </div>
    </Link>
  );
}
