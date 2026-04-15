'use client';

import { useState } from 'react';
import { ChevronLeft, CreditCard, Plus, Trash2, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'paypay';
  label: string;
  detail: string;
  isDefault: boolean;
}

const initialMethods: PaymentMethod[] = [
  { id: '1', type: 'credit', label: 'クレジットカード', detail: '**** **** **** 1234', isDefault: true },
  { id: '2', type: 'paypay', label: 'PayPay', detail: '連携済み', isDefault: false },
];

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);

  const handleSetDefault = (id: string) => {
    setMethods(methods.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  const handleRemove = (id: string) => {
    setMethods(methods.filter((m) => m.id !== id));
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
            <h1 className="text-xl font-bold text-gray-900">支払い方法</h1>
          </div>

          {/* Payment Methods List */}
          {methods.length > 0 ? (
            <div className="space-y-3">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 ${
                    method.isDefault ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {method.type === 'credit' ? (
                        <CreditCard size={20} className="text-gray-600" />
                      ) : (
                        <DollarSign size={20} className="text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{method.label}</p>
                      <p className="text-xs text-gray-500">{method.detail}</p>
                    </div>
                    {method.isDefault ? (
                      <span className="text-xs bg-yellow-400 text-white px-2 py-1 rounded-full">
                        デフォルト
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          デフォルトにする
                        </button>
                        <button
                          onClick={() => handleRemove(method.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CreditCard size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">支払い方法が登録されていません</p>
            </div>
          )}

          {/* Add Button */}
          <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors">
            <Plus size={18} />
            <span className="text-sm font-medium">支払い方法を追加</span>
          </button>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
