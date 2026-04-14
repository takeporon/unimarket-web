'use client';

import { CheckCircle, Home } from 'lucide-react';
import Link from 'next/link';

export default function OrderCompletePage() {
  const orderNumber = 'ORDER-' + Date.now().toString().slice(-8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4 py-8">
      {/* Success Icon */}
      <div className="mb-6">
        <CheckCircle size={80} className="text-green-500" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
        ご購入ありがとうございます！
      </h1>
      <p className="text-gray-600 text-center mb-8">
        注文が確定しました
      </p>

      {/* Order Details Card */}
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">注文番号</p>
            <p className="text-lg font-mono font-bold text-gray-900 break-all">{orderNumber}</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 mb-1">取引状態</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm font-medium text-gray-900">注文確定</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 mb-2">次のステップ</p>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>出品者が商品を準備します</li>
              <li>配送またはお渡しの手続き</li>
              <li>商品を受け取ります</li>
              <li>取引完了</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="w-full max-w-sm bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-900">
          📬 出品者から間もなく送信予定のメッセージをご確認ください
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-3">
        {/* View Order Button */}
        <Link
          href="/purchase-history"
          className="block w-full px-4 py-3 text-center rounded-lg bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors"
        >
          購入履歴を確認
        </Link>

        {/* Home Button */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition-colors"
        >
          <Home size={20} />
          ホームに戻る
        </Link>
      </div>

      {/* Footer Message */}
      <p className="text-xs text-gray-500 text-center mt-8">
        何ご質問やサポートが必要な場合は、
        <br />
        ヘルプセンターをご覧ください
      </p>
    </div>
  );
}
