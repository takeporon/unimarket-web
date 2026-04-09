'use client';

import { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';

const allProducts = [
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
  {
    id: '7',
    title: '化学教科書',
    description: '5年前版',
    price: 2000,
    imageUrl: '/images/placeholder-7.jpg',
  },
  {
    id: '8',
    title: '消しゴムセット',
    description: '10個入り',
    price: 1200,
    imageUrl: '/images/placeholder-8.jpg',
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const handleLikeToggle = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = allProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">すべての商品</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="商品を検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 py-4">
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
  );
}
