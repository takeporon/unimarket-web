'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Unimarketとは何ですか？',
    answer: 'Unimarketは大学生同士で教科書や文房具などを売買できるフリマアプリです。大学メールアドレス（ac.jp）で登録することで、安心して取引ができます。',
  },
  {
    id: '2',
    question: '出品するにはどうすればいいですか？',
    answer: '画面下部の「出品」ボタンをタップし、商品の写真・タイトル・説明・価格を入力して出品してください。',
  },
  {
    id: '3',
    question: '支払い方法は何がありますか？',
    answer: '現在、クレジットカードとPayPayに対応しています。今後、他の決済方法も追加予定です。',
  },
  {
    id: '4',
    question: '商品が届かない場合はどうすればいいですか？',
    answer: '「現在の取引状況」から該当の取引を確認し、出品者にメッセージを送ってください。解決しない場合はサポートまでお問い合わせください。',
  },
  {
    id: '5',
    question: '返品・返金はできますか？',
    answer: '商品説明と著しく異なる場合は、受け取りから3日以内にサポートへご連絡ください。状況を確認の上、対応いたします。',
  },
  {
    id: '6',
    question: 'アカウントを退会したい場合は？',
    answer: '「設定・その他」>「アカウント」から退会手続きを行えます。退会後はデータの復元ができませんのでご注意ください。',
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
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
            <h1 className="text-xl font-bold text-gray-900">ヘルプ・よくある質問</h1>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1 mr-2">
                    <HelpCircle size={18} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                  </div>
                  {openId === faq.id ? (
                    <ChevronUp size={18} className="text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openId === faq.id && (
                  <div className="pb-4 pl-9 pr-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-700 mb-2">問題が解決しない場合</p>
            <button className="px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
