'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">教科書・専門書</h1>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="検索"
            className="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Browse Button */}
        <button className="w-full px-4 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors">
          商品を探す
        </button>

        {/* Coming Soon or Featured Section */}
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-500">
          <p>商品はまもなく表示されます</p>
        </div>

        {/* Browse All Link */}
        <div className="flex gap-4">
          <Link
            href="/products"
            className="flex-1 text-center text-blue-600 font-medium hover:underline py-2"
          >
            すべての商品を見る →
          </Link>
          <Link
            href="/login"
            className="flex-1 text-center px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition-colors"
          >
            ログイン
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
