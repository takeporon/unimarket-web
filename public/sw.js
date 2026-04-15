// UniMarket Service Worker - Push Notifications

self.addEventListener('push', (event) => {
  const defaultData = {
    title: 'UniMarket',
    body: '新しい通知があります',
    icon: '/logo.png',
    badge: '/logo.png',
    url: '/home',
  };

  let data = defaultData;
  if (event.data) {
    try {
      data = { ...defaultData, ...event.data.json() };
    } catch {
      data = { ...defaultData, body: event.data.text() };
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      data: { url: data.url },
      vibrate: [200, 100, 200],
      tag: data.tag || 'unimarket-notification',
      renotify: true,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/home';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
