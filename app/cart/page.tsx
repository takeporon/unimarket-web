'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface CartItem {
  id: string;
  title: string;
  price: number;
}

const initialCartItems: CartItem[] = [
  { id: '1', title: 'モンスター24本', price: 10000 },
  { id: '2', title: '数学教科書', price: 5000 },
  { id: '3', title: '物理参考書', price: 5000 },
  { id: '4', title: 'ノート（100均）', price: 5000 },
];

const SHIPPING_FEE: number = 0;

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + SHIPPING_FEE;

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    router.push('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="pt-16 pb-20">
        {/* Title */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-gray-900">Cart</h1>
        </div>

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="px-4 py-4 flex items-center gap-3">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0" />

                  {/* Price */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {item.price.toLocaleString()}円
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="px-4 pt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">小計:</span>
                <span className="text-gray-900">{subtotal.toLocaleString()}円</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">配送料:</span>
                <span className="text-gray-900">円</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-bold text-gray-900">合計:</span>
                <span className="font-bold text-gray-500">{total.toLocaleString()}円</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="px-4 pt-6 pb-4">
              <button
                onClick={handleCheckout}
                className="w-full max-w-sm mx-auto block px-6 py-3 rounded-full bg-cyan-400 text-white font-bold hover:bg-cyan-500 transition-colors text-center"
              >
                レジへ進む
              </button>
            </div>
          </>
        ) : (
          <div className="px-4 py-12 text-center">
            <p className="text-gray-500 mb-4">カートに商品がありません</p>
            <Link
              href="/home"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              商品を探す
            </Link>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
