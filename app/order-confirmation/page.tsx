'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: string;
  title: string;
  price: number;
}

const orderItems: OrderItem[] = [
  { id: '1', title: 'モンスター24本', price: 10000 },
  { id: '2', title: '数学教科書', price: 5000 },
  { id: '3', title: '物理参考書', price: 5000 },
  { id: '4', title: 'ノート（100均）', price: 5000 },
];

const subtotal = orderItems.reduce((acc, item) => acc + item.price, 0);
const total = subtotal;

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypay'>('credit');

  const handlePurchase = () => {
    router.push('/order-complete');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">注文確認</h1>
      </div>

      {/* Order Items */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 mb-3">
        <h2 className="font-bold text-gray-900 mb-3">購入する商品</h2>
        <div className="space-y-3">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{item.title}</span>
              <span className="font-medium text-gray-900">{item.price.toLocaleString()}円</span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Method */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 mb-3">
        <h2 className="font-bold text-gray-900 mb-3">配送方法</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="delivery"
              value="delivery"
              checked={deliveryMethod === 'delivery'}
              onChange={() => setDeliveryMethod('delivery')}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-900">配送を希望</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="delivery"
              value="pickup"
              checked={deliveryMethod === 'pickup'}
              onChange={() => setDeliveryMethod('pickup')}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-900">手渡し（学生センター）</span>
          </label>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 mb-3">
        <h2 className="font-bold text-gray-900 mb-3">支払い方法</h2>
        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={() => setPaymentMethod('credit')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-900">クレジットカード</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </label>
          <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="paypay"
                checked={paymentMethod === 'paypay'}
                onChange={() => setPaymentMethod('paypay')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-900">PayPay</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </label>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 mb-3">
        <h2 className="font-bold text-gray-900 mb-3">配送先住所</h2>
        <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
          <span className="text-sm text-gray-600">住所を入力</span>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Order Summary - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        {/* Summary */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">商品合計：</span>
            <span className="font-medium text-gray-900">{subtotal.toLocaleString()}円</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">配送料：</span>
            <span className="font-medium text-gray-900">円</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-bold text-gray-900">合計：</span>
            <span className="text-xl font-bold text-gray-900">{total.toLocaleString()}円</span>
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          className="w-full px-4 py-3 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition-colors"
        >
          購入確定
        </button>
      </div>
    </div>
  );
}
