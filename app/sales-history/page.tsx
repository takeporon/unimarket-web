'use client';

import { useState } from 'react';
import { ChevronLeft, Package, CheckCircle, Truck, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface SalesItem {
  id: string;
  orderNumber: string;
  date: string;
  status: 'completed' | 'shipping' | 'pending';
  buyer: string;
  items: { title: string; price: number }[];
  total: number;
}

const salesData: SalesItem[] = [
  {
    id: '1',
    orderNumber: 'S-20260401-001',
    date: '2026/04/01',
    status: 'completed',
    buyer: 'たなか',
    items: [{ title: '数学教科書', price: 5000 }],
    total: 5000,
  },
  {
    id: '2',
    orderNumber: 'S-20260403-002',
    date: '2026/04/03',
    status: 'shipping',
    buyer: 'さとう',
    items: [{ title: '物理参考書', price: 3500 }],
    total: 3500,
  },
  {
    id: '3',
    orderNumber: 'S-20260410-003',
    date: '2026/04/10',
    status: 'pending',
    buyer: 'すずき',
    items: [{ title: 'ノート5冊セット', price: 500 }],
    total: 500,
  },
];

const statusConfig = {
  completed: { label: '取引完了', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  shipping: { label: '発送済み', icon: Truck, color: 'text-blue-600 bg-blue-50' },
  pending: { label: '入金待ち', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
};

export default function SalesHistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { value: 'all', label: 'すべて' },
    { value: 'completed', label: '完了' },
    { value: 'shipping', label: '発送済み' },
    { value: 'pending', label: '入金待ち' },
  ];

  const filtered = filter === 'all' ? salesData : salesData.filter((s) => s.status === filter);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-16 pb-20">
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">販売履歴</h1>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  filter === f.value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sales List */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((sale) => {
                const config = statusConfig[sale.status];
                const StatusIcon = config.icon;
                return (
                  <div key={sale.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">{sale.orderNumber}</span>
                      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${config.color}`}>
                        <StatusIcon size={12} />
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{sale.date}</p>
                    <p className="text-sm text-gray-700">購入者: {sale.buyer}</p>
                    {sale.items.map((item, i) => (
                      <p key={i} className="text-sm text-gray-900 mt-1">{item.title}</p>
                    ))}
                    <p className="text-base font-bold text-gray-900 mt-2">
                      {sale.total.toLocaleString()}円
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">販売履歴がありません</p>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
