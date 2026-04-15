export type PushPermissionState = 'granted' | 'denied' | 'default' | 'unsupported';

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
    if (subscription) {
      return { permission: 'granted', subscription };
    }

    // 新規購読を作成（バックエンド連携時にVAPID公開鍵を設定）
    // TODO: バックエンドからVAPID公開鍵を取得して設定
    // subscription = await registration.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: '<VAPID_PUBLIC_KEY>',
    // });

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
      return await subscription.unsubscribe();
    }
    return true;
  } catch (error) {
    console.error('Push unsubscribe failed:', error);
    return false;
  }
}

/**
 * テスト用：ローカル通知を表示
 */
export async function sendTestNotification(): Promise<boolean> {
  if (Notification.permission !== 'granted') return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification('UniMarket テスト通知', {
      body: 'プッシュ通知が正常に設定されました！',
      icon: '/logo.png',
      badge: '/logo.png',
      tag: 'test-notification',
    });
    return true;
  } catch (error) {
    console.error('Test notification failed:', error);
    return false;
  }
}
