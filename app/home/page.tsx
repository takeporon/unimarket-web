'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

const sampleProducts = [
  {
    id: '1',
    title: 'モンスター24本',
    description: 'おいしいです',
    price: 10000,
  },
  {
    id: '2',
    title: '数学教科書',
    description: '2023年版',
    price: 5000,
  },
  {
    id: '3',
    title: '物理参考書',
    description: '大学受験対策',
    price: 3500,
  },
  {
    id: '4',
    title: 'ノート（100均）',
    description: '5冊セット',
    price: 500,
  },
  {
    id: '5',
    title: '英語教材',
    description: 'TOEIC対策',
    price: 4000,
  },
  {
    id: '6',
    title: 'シャーペン',
    description: 'Uni-Mitsubishi',
    price: 800,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = sampleProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="pt-16 pb-20">
        {/* Title & Search Section */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-gray-900 mb-4">教科書・専門書</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 bg-white focus:outline-none focus:border-gray-400 text-sm"
            />
          </div>

          {/* Filter Bar */}
          <div className="bg-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-500">
            商品を探す
          </div>
        </div>

        {/* Product List - Single Column */}
        <div className="px-4 mt-4">
          {filteredProducts.length > 0 ? (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                    {/* Product Image Placeholder */}
                    <div className="w-full h-52 bg-gray-300" />

                    {/* Product Info */}
                    <div className="px-4 py-3">
                      <h3 className="font-bold text-base text-gray-900">{product.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{product.description}</p>
                      <p className="text-base font-bold text-gray-900 mt-1">
                        {product.price.toLocaleString()}円
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">該当する商品がありません</p>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
