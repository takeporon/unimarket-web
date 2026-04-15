'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const initialSettings: NotificationSetting[] = [
  { id: 'message', label: 'メッセージ', description: '新しいメッセージを受信したとき', enabled: true },
  { id: 'like', label: 'いいね！', description: '出品した商品にいいねがついたとき', enabled: true },
  { id: 'order', label: '注文・取引', description: '購入・販売に関する通知', enabled: true },
  { id: 'shipping', label: '発送・配送', description: '発送状況の更新があったとき', enabled: true },
  { id: 'price', label: '値下げ', description: 'いいねした商品が値下げされたとき', enabled: false },
  { id: 'promotion', label: 'お知らせ', description: 'キャンペーンやお知らせ情報', enabled: false },
];

export default function NotificationSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSetting[]>(initialSettings);

  const toggleSetting = (id: string) => {
    setSettings(settings.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
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
            <h1 className="text-xl font-bold text-gray-900">通知設定</h1>
          </div>

          <div className="divide-y divide-gray-100">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between py-4">
                <div className="flex-1 mr-4">
                  <p className="text-base text-gray-900">{setting.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    setting.enabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      setting.enabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
