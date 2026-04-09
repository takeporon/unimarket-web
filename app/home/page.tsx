'use client';

import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

// サンプルデータ
const categories = [
  { id: '1', name: '教科書', icon: '📕' },
  { id: '2', name: '参考書', icon: '📗' },
  { id: '3', name: '文房具', icon: '✏️' },
  { id: '4', name: 'その他', icon: '📦' },
];

const sampleProducts = [
  {
    id: '1',
    title: 'モンスター24本',
    description: 'おいしいです',
    price: 10000,
    imageUrl: '/images/placeholder-1.jpg',
  },
  {
    id: '2',
    title: '数学教科書',
    description: '2023年版',
    price: 5000,
    imageUrl: '/images/placeholder-2.jpg',
  },
  {
    id: '3',
    title: '物理参考書',
    description: '大学受験対策',
    price: 3500,
    imageUrl: '/images/placeholder-3.jpg',
  },
  {
    id: '4',
    title: 'ノート（100均）',
    description: '5冊セット',
    price: 500,
    imageUrl: '/images/placeholder-4.jpg',
  },
  {
    id: '5',
    title: '英語教材',
    description: 'TOEIC対策',
    price: 4000,
    imageUrl: '/images/placeholder-5.jpg',
  },
  {
    id: '6',
    title: 'シャーペン',
    description: 'Uni-Mitsubishi',
    price: 800,
    imageUrl: '/images/placeholder-6.jpg',
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const handleLikeToggle = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = sampleProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Search Section */}
      <div className="bg-white sticky top-12 z-10 px-4 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-3">教科書・専門書</h2>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
          />
        </div>

        {/* Filter */}
        <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600">
          商品を探す
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4">
        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">カテゴリ</h3>
            <Link href="/categories" className="text-blue-600 text-sm flex items-center gap-1">
              すべて <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-yellow-100 text-yellow-900'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } border ${
                  selectedCategory === category.id
                    ? 'border-yellow-400'
                    : 'border-gray-200'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* New Products Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">新着商品</h3>
            <Link href="/products?sort=latest" className="text-blue-600 text-sm flex items-center gap-1">
              もっと見る <ChevronRight size={16} />
            </Link>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  liked={likedProducts.includes(product.id)}
                  onLikeToggle={handleLikeToggle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">該当する商品がありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
