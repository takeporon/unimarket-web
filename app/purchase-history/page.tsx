'use client';

import { useState } from 'react';
import { ChevronLeft, Package, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'delivered' | 'shipping' | 'pending';
  items: Array<{
    productTitle: string;
    price: number;
    quantity: number;
    seller: string;
  }>;
}

// サンプルデータ
const purchaseHistory: PurchaseOrder[] = [
  {
    id: '1',
    orderNumber: '202604091430',
    date: '2026-04-09',
    total: 10000,
    status: 'delivered',
    items: [
      {
        productTitle: 'モンスター24本',
        price: 10000,
        quantity: 1,
        seller: 'あきら',
      },
    ],
  },
  {
    id: '2',
    orderNumber: '202604081015',
    date: '2026-04-08',
    total: 15000,
    status: 'shipping',
    items: [
      {
        productTitle: '参考書 化学',
        price: 8000,
        quantity: 1,
        seller: 'たなか',
      },
      {
        productTitle: 'ノート 5冊セット',
        price: 7000,
        quantity: 1,
        seller: 'さとみ',
      },
    ],
  },
  {
    id: '3',
    orderNumber: '202604071200',
    date: '2026-04-07',
    total: 5500,
    status: 'pending',
    items: [
      {
        productTitle: 'ボールペン 10本',
        price: 5500,
        quantity: 1,
        seller: 'じゅんぺい',
      },
    ],
  },
  {
    id: '4',
    orderNumber: '202604051800',
    date: '2026-04-05',
    total: 20000,
    status: 'delivered',
    items: [
      {
        productTitle: '教科書 数学上',
        price: 12000,
        quantity: 1,
        seller: 'ゆうき',
      },
      {
        productTitle: '教科書 数学下',
        price: 8000,
        quantity: 1,
        seller: 'ゆうき',
      },
    ],
  },
];

const statusConfig = {
  delivered: {
    label: '配送完了',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  shipping: {
    label: '配送中',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  pending: {
    label: '処理中',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
};

export default function PurchaseHistoryPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<'all' | 'delivered' | 'shipping' | 'pending'>('all');

  const filteredOrders =
    filterStatus === 'all'
      ? purchaseHistory
      : purchaseHistory.filter((order) => order.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <span className="text-lg font-bold text-gray-900">購入履歴</span>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filterStatus === 'all'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          すべて
        </button>
        <button
          onClick={() => setFilterStatus('delivered')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filterStatus === 'delivered'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          配送完了
        </button>
        <button
          onClick={() => setFilterStatus('shipping')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filterStatus === 'shipping'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          配送中
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filterStatus === 'pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          処理中
        </button>
      </div>

      {/* Orders List */}
      <div className="bg-white">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package size={48} className="text-gray-300 mb-3" />
            <p className="text-gray-600 text-sm">注文がありません</p>
          </div>
        ) : (
          filteredOrders.map((order, index) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;

            return (
              <button
                key={order.id}
                onClick={() => router.push(`/purchase-history/${order.id}`)}
                className={`w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors ${
                  index !== filteredOrders.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">注文番号: {order.orderNumber}</p>
                    <p className="font-bold text-gray-900 text-sm">{order.date}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center gap-1 ${config.bgColor}`}>
                    <StatusIcon size={16} className={config.color} />
                    <span className={`text-xs font-semibold ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="space-y-2 mb-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-gray-900 truncate">{item.productTitle}</p>
                        <p className="text-xs text-gray-500">{item.seller} より</p>
                      </div>
                      <p className="text-gray-700 font-semibold">
                        ¥{item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">合計</span>
                  <span className="text-lg font-bold text-gray-900">
                    ¥{order.total.toLocaleString()}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
