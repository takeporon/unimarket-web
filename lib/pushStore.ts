import type { PushSubscription } from 'web-push';

// インメモリ購読ストア（再デプロイで消える）
const subscriptions = new Map<string, PushSubscription>();

export function addSubscription(subscription: PushSubscription): void {
  const key = subscription.endpoint;
  subscriptions.set(key, subscription);
}

export function removeSubscription(endpoint: string): boolean {
  return subscriptions.delete(endpoint);
}

export function getAllSubscriptions(): PushSubscription[] {
  return Array.from(subscriptions.values());
}

export function getSubscriptionCount(): number {
  return subscriptions.size;
}
