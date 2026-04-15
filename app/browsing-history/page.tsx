'use client';

import { useState } from 'react';
import { ChevronLeft, Eye, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface BrowsingItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  viewedAt: string;
}

const initialHistory: BrowsingItem[] = [
  { id: '1', productId: '1', title: 'モンスター24本', price: 10000, viewedAt: '1時間前' },
  { id: '2', productId: '2', title: '数学教科書', price: 5000, viewedAt: '3時間前' },
  { id: '3', productId: '3', title: '物理参考書', price: 3500, viewedAt: '昨日' },
  { id: '4', productId: '5', title: '英語教材', price: 4000, viewedAt: '2日前' },
  { id: '5', productId: '6', title: 'シャーペン', price: 800, viewedAt: '3日前' },
];

export default function BrowsingHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<BrowsingItem[]>(initialHistory);

  const handleRemove = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-16 pb-20">
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 flex-1">閲覧履歴</h1>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-500 hover:text-red-700"
              >
                すべて削除
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {history.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  {/* Thumbnail */}
                  <Link href={`/products/${item.productId}`} className="w-14 h-14 bg-gray-200 rounded-lg flex-shrink-0" />

                  {/* Info */}
                  <Link href={`/products/${item.productId}`} className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-sm text-gray-900 mt-0.5">{item.price.toLocaleString()}円</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.viewedAt}</p>
                  </Link>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Eye size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">閲覧履歴がありません</p>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
