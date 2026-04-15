export type PushPermissionState = 'granted' | 'denied' | 'default' | 'unsupported';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';

/**
 * Base64 URL文字列をUint8Arrayに変換（applicationServerKey用）
 */
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}

/**
 * ブラウザがプッシュ通知をサポートしているか確認
 */
export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

/**
 * 現在の通知許可状態を取得
 */
export function getPermissionState(): PushPermissionState {
  if (!isPushSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Service Workerを登録
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
}

/**
 * 購読情報をサーバーに送信
 */
async function sendSubscriptionToServer(subscription: PushSubscription): Promise<boolean> {
  try {
    const res = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription }),
    });
    return res.ok;
  } catch (error) {
    console.error('Failed to send subscription to server:', error);
    return false;
  }
}

/**
 * 通知許可をリクエストしてプッシュ購読を開始
 */
export async function requestPushPermission(): Promise<{
  permission: PushPermissionState;
  subscription: PushSubscription | null;
}> {
  if (!isPushSupported()) {
    return { permission: 'unsupported', subscription: null };
  }

  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
    return { permission, subscription: null };
  }

  const registration = await registerServiceWorker();
  if (!registration) {
    return { permission: 'granted', subscription: null };
  }

  try {
    // 既存の購読があればそれを返す
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription && VAPID_PUBLIC_KEY) {
      // 新規購読を作成
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    if (subscription) {
      await sendSubscriptionToServer(subscription);
    }

    return { permission: 'granted', subscription };
  } catch (error) {
    console.error('Push subscription failed:', error);
    return { permission: 'granted', subscription: null };
  }
}

/**
 * プッシュ購読を解除
 */
export async function unsubscribePush(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      // サーバーからも削除
      await fetch('/api/push/subscribe', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
      return await subscription.unsubscribe();
    }
    return true;
  } catch (error) {
    console.error('Push unsubscribe failed:', error);
    return false;
  }
}

/**
 * テスト用：サーバー経由でプッシュ通知を送信
 */
export async function sendTestNotification(): Promise<boolean> {
  try {
    const res = await fetch('/api/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'UniMarket テスト通知',
        body: 'プッシュ通知が正常に設定されました！',
        url: '/notification-settings',
        tag: 'test-notification',
      }),
    });
    const data = await res.json();
    return data.success && data.sent > 0;
  } catch (error) {
    console.error('Test notification failed:', error);
    return false;
  }
}
