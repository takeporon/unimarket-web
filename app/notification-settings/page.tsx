'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Bell, BellOff, BellRing, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import {
  isPushSupported,
  getPermissionState,
  requestPushPermission,
  sendTestNotification,
  type PushPermissionState,
} from '@/lib/pushNotifications';

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

const permissionLabels: Record<PushPermissionState, { text: string; color: string }> = {
  granted: { text: '許可済み', color: 'text-green-600' },
  denied: { text: 'ブロック中', color: 'text-red-600' },
  default: { text: '未設定', color: 'text-yellow-600' },
  unsupported: { text: '非対応ブラウザ', color: 'text-gray-500' },
};

export default function NotificationSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSetting[]>(initialSettings);
  const [pushPermission, setPushPermission] = useState<PushPermissionState>('default');
  const [isRequesting, setIsRequesting] = useState(false);
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    setPushPermission(getPermissionState());
  }, []);

  const toggleSetting = (id: string) => {
    setSettings(settings.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    const result = await requestPushPermission();
    setPushPermission(result.permission);
    setIsRequesting(false);
  };

  const handleTestNotification = async () => {
    const sent = await sendTestNotification();
    if (sent) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }
  };

  const supported = isPushSupported();
  const label = permissionLabels[pushPermission];

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

          {/* プッシュ通知セクション */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3 mb-3">
              {pushPermission === 'granted' ? (
                <BellRing size={22} className="text-green-600" />
              ) : pushPermission === 'denied' ? (
                <BellOff size={22} className="text-red-500" />
              ) : (
                <Bell size={22} className="text-gray-600" />
              )}
              <div>
                <h2 className="text-base font-semibold text-gray-900">プッシュ通知</h2>
                <p className={`text-xs font-medium ${label.color}`}>{label.text}</p>
              </div>
            </div>

            {!supported && (
              <p className="text-xs text-gray-500 mb-3">
                このブラウザはプッシュ通知に対応していません。Chrome、Edge、またはSafari 16.4以降をご利用ください。
              </p>
            )}

            {supported && pushPermission === 'default' && (
              <div>
                <p className="text-xs text-gray-500 mb-3">
                  プッシュ通知を有効にすると、メッセージや取引の更新をリアルタイムで受け取れます。
                </p>
                <button
                  onClick={handleRequestPermission}
                  disabled={isRequesting}
                  className="w-full py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {isRequesting ? '設定中...' : 'プッシュ通知を許可する'}
                </button>
              </div>
            )}

            {supported && pushPermission === 'denied' && (
              <p className="text-xs text-gray-500">
                ブラウザの設定からこのサイトの通知を許可してください。
                設定 → サイトの権限 → 通知 から変更できます。
              </p>
            )}

            {supported && pushPermission === 'granted' && (
              <div>
                <p className="text-xs text-gray-500 mb-3">
                  プッシュ通知が有効です。以下のカテゴリごとに通知のオン/オフを設定できます。
                </p>
                <button
                  onClick={handleTestNotification}
                  disabled={testSent}
                  className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  <Send size={14} />
                  {testSent ? 'テスト通知を送信しました' : 'テスト通知を送信'}
                </button>
              </div>
            )}
          </div>

          {/* 通知カテゴリ設定 */}
          <h2 className="text-sm font-semibold text-gray-500 mb-2 px-1">カテゴリ別設定</h2>
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
