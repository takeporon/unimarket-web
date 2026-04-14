'use client';
import { ChevronLeft, Copy, Check } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

const orderDetails = {
  '1': {
    orderNumber: '202604091430',
    date: '2026-04-09',
    status: 'delivered',
    items: [{ title: 'モンスター24本', price: 10000, seller: 'あきら', qty: 1 }],
    total: 10000,
  },
  '2': {
    orderNumber: '202604081015',
    date: '2026-04-08',
    status: 'shipping',
    items: [
      { title: '参考書 化学', price: 8000, seller: 'たなか', qty: 1 },
      { title: 'ノート 5冊セット', price: 7000, seller: 'さとみ', qty: 1 },
    ],
    total: 15000,
  },
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = typeof params.id === 'string' ? params.id : '';
  const order = orderDetails[orderId as keyof typeof orderDetails] || null;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">注文が見つかりません</div>;
  }

  const statusText = order.status === 'delivered' ? '配送完了' : '配送中';
  const statusColor = order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-2">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">注文詳細</h1>
      </div>

      <div className={`${statusColor} px-4 py-3 border-b`}>
        <p className="font-semibold text-sm">{statusText}</p>
      </div>

      <div className="bg-white px-4 py-4 border-b flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">注文番号</p>
          <p className="font-bold">{order.orderNumber}</p>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(order.orderNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          <span className="text-xs">{copied ? 'コピー済み' : 'コピー'}</span>
        </button>
      </div>

      <div className="bg-white border-b">
        <div className="px-4 py-3 border-b font-bold text-sm">商品一覧</div>
        {order.items.map((item, i) => (
          <div key={i} className="px-4 py-3 border-b flex justify-between">
            <div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-1">{item.seller} より</p>
            </div>
            <p className="font-bold">¥{item.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border-b px-4 py-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">小計</span>
          <span className="font-semibold">¥{order.total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">送料</span>
          <span className="font-semibold">無料</span>
        </div>
        <div className="pt-2 border-t flex justify-between">
          <span className="font-bold">合計</span>
          <span className="text-xl font-bold">¥{order.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <button onClick={() => router.back()} className="w-full py-3 bg-gray-200 rounded font-semibold hover:bg-gray-300">
          戻る
        </button>
        <button onClick={() => router.push('/home')} className="w-full py-3 bg-yellow-400 rounded font-semibold hover:bg-yellow-500">
          ホームに戻る
        </button>
      </div>
    </div>
  );
}
