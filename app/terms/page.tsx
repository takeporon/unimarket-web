'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-16 pb-20">
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">利用規約等</h1>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">第1条（適用）</h2>
              <p>
                本規約は、ユーザーと当サービス「Unimarket」との間の利用に関する条件を定めるものです。
                ユーザーは、本サービスを利用することにより、本規約に同意したものとみなされます。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">第2条（利用登録）</h2>
              <p>
                本サービスの利用には、大学が発行するメールアドレス（ac.jpドメイン）による登録が必要です。
                登録時に虚偽の情報を提供した場合、アカウントが停止される場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">第3条（禁止事項）</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>他のユーザーの個人情報を不正に取得する行為</li>
                <li>サービスの運営を妨害する行為</li>
                <li>不正アクセスまたはこれを試みる行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">第4条（取引について）</h2>
              <p>
                ユーザー間の取引はユーザー自身の責任において行われます。
                当サービスは取引の仲介を行いますが、取引内容について保証するものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">第5条（免責事項）</h2>
              <p>
                当サービスは、ユーザー間のトラブルについて一切の責任を負いません。
                また、サービスの中断・変更・終了によりユーザーに損害が生じた場合も、責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">プライバシーポリシー</h2>
              <p>
                当サービスは、ユーザーの個人情報を適切に管理し、サービスの提供および改善のためにのみ使用します。
                第三者への提供は法令に基づく場合を除き、行いません。
              </p>
            </section>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
