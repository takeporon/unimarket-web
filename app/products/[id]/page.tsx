'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// サンプルデータ（API呼び出しで置き換え予定）
const productData = {
  id: '1',
  title: 'モンスター24本',
  description: 'おいしいです',
  price: 10000,
  category: '飲料',
  condition: 'ほぼ未使用',
  likes: 42,
  imageUrl: '/images/placeholder-1.jpg',
  seller: {
    name: 'あきら',
    avatar: '/images/avatar-1.jpg',
    university: '東京大学',
    reviews: 15,
    rating: 4.8,
  },
  details: [
    '商品の説明が入ります',
    '配送方法：発送可',
    '引渡し期限：2026-04-20',
  ],
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(productData.likes);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddToCart = () => {
    // TODO: カートに追加する処理
    alert('カートに追加しました');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Top Back Button */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <span className="text-sm font-medium text-gray-600">商品詳細</span>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-80 bg-gray-300 flex items-center justify-center text-gray-500">
        {/* Image Placeholder */}
        <div className="text-center">
          <p className="text-sm">商品画像</p>
        </div>

        {/* Like Button - Floating */}
        <button
          onClick={handleLikeClick}
          className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <Heart
            size={24}
            className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Product Info Section */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        {/* Title & Price */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{productData.title}</h1>
        <p className="text-gray-600 text-sm mb-4">{productData.description}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{productData.price.toLocaleString()}</span>
          <span className="text-sm text-gray-500">円</span>
        </div>

        {/* Likes */}
        <div className="flex items-center gap-2 mt-3 text-gray-600 text-sm">
          <Heart size={16} />
          <span>{likeCount}人がいいね</span>
        </div>
      </div>

      {/* Item Details */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3">商品の詳細</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 w-32">カテゴリ</span>
            <span className="text-gray-900">{productData.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 w-32">状態</span>
            <span className="text-gray-900">{productData.condition}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 w-32">配送</span>
            <span className="text-gray-900">発送可</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3">説明</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {productData.details.join('\n')}
        </p>
      </div>

      {/* Seller Info */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3">出品者</h3>
        <div className="flex items-center gap-3">
          {/* Avatar Placeholder */}
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-500">
            {productData.seller.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">{productData.seller.name}</p>
            <p className="text-xs text-gray-600">
              ⭐ {productData.seller.rating} ({productData.seller.reviews}件)
            </p>
          </div>
          <Link href={`/profiles/${productData.seller.name}`} className="text-blue-600 text-sm">
            プロフィール
          </Link>
        </div>
      </div>

      {/* Action Buttons - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
        {/* Chat Button */}
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors">
          <MessageCircle size={20} />
          チャット
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex-1 px-4 py-3 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition-colors"
        >
          カートに追加
        </button>
      </div>
    </div>
  );
}
