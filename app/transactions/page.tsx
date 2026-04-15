'use client';

import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface Transaction {
  id: string;
  type: 'buying' | 'selling';
  productTitle: string;
  partnerName: string;
  status: string;
  statusDetail: string;
  date: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'buying',
    productTitle: 'モンスター24本',
    partnerName: 'あきら',
    status: '発送待ち',
    statusDetail: '出品者が発送準備中です',
    date: '2026/04/13',
  },
  {
    id: '2',
    type: 'selling',
    productTitle: '英語教材',
    partnerName: 'やまだ',
    status: '入金確認済み',
    statusDetail: '商品を発送してください',
    date: '2026/04/12',
  },
  {
    id: '3',
    type: 'buying',
    productTitle: '数学教科書',
    partnerName: 'たなか',
    status: '配送中',
    statusDetail: '明日到着予定です',
    date: '2026/04/11',
  },
];

export default function TransactionsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-16 pb-20">
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">現在の取引状況</h1>
          </div>

          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <button
                  key={tx.id}
                  className="w-full text-left border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      tx.type === 'buying' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {tx.type === 'buying' ? '購入' : '出品'}
                    </span>
                    <span className="text-xs text-gray-500">{tx.date}</span>
                  </div>
                  <p className="font-bold text-gray-900">{tx.productTitle}</p>
                  <p className="text-sm text-gray-500 mt-1">相手: {tx.partnerName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={14} className="text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600">{tx.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{tx.statusDetail}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">現在進行中の取引はありません</p>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
