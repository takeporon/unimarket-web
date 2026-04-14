'use client';

import { ChevronRight, User, Clock, FileText, Bell, MapPin, MessageSquare, HelpCircle, Eye, DollarSign } from 'lucide-react';
import Link from 'next/link';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

const menuItems = [
  { label: 'アカウント', icon: User, href: '/profile' },
  { label: '購入履歴', icon: Clock, href: '/purchase-history' },
  { label: '販売履歴', icon: Clock, href: '/sales-history' },
  { label: '利用規約等', icon: FileText, href: '/terms' },
  { label: '通知設定', icon: Bell, href: '/notification-settings' },
  { label: '現在の取引状況', icon: MapPin, href: '/transactions' },
  { label: 'メッセージ', icon: MessageSquare, href: '/chat' },
  { label: 'ヘルプ・よくある質問', icon: HelpCircle, href: '/help' },
  { label: '閲覧履歴', icon: Eye, href: '/browsing-history' },
];

const bottomItems = [
  { label: '支払い方法', icon: DollarSign, href: '/payment-methods' },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="pt-16 pb-20">
        {/* Title */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-gray-900">設定・その他</h1>
        </div>

        {/* Menu List */}
        <div className="divide-y divide-gray-100">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <Icon size={20} className="text-gray-700 mr-3 flex-shrink-0" />
                <span className="flex-1 text-base text-gray-900">{item.label}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            );
          })}
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-200 my-2" />

        {/* Bottom Items */}
        <div className="divide-y divide-gray-100">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <Icon size={20} className="text-gray-700 mr-3 flex-shrink-0" />
                <span className="flex-1 text-base text-gray-900">{item.label}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            );
          })}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
