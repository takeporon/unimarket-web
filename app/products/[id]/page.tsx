'use client';

import { useState } from 'react';
import { Heart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

// サンプルデータ（API呼び出しで置き換え予定）
const productData = {
  id: '1',
  title: 'モンスター24本',
  description: 'おいしいです',
  price: 10000,
  stock: 9,
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    // TODO: カートに追加する処理
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="pt-16 pb-20">
        {/* Back Button */}
        <div className="px-4 pt-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Product Info - Centered */}
        <div className="px-6 pt-6 text-center">
          {/* Title + Heart */}
          <div className="flex items-start justify-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {productData.title}
            </h1>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="mt-1 flex-shrink-0"
            >
              <Heart
                size={28}
                className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-3">{productData.description}</p>

          {/* Price */}
          <p className="text-lg text-gray-900 mt-3">
            {productData.price.toLocaleString()}円
          </p>

          {/* Stock */}
          <p className="text-gray-900 mt-3">{productData.stock}</p>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[120px]" />

        {/* Add to Cart Button */}
        <div className="px-6 mt-12">
          <button
            onClick={handleAddToCart}
            className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-yellow-400 text-white font-bold hover:bg-yellow-500 transition-colors"
          >
            ＋ カートに追加する
          </button>
        </div>

        {/* View Cart Link */}
        <div className="text-center mt-6">
          <Link href="/cart" className="text-gray-400 text-sm hover:text-gray-600">
            カートの中を見る
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
