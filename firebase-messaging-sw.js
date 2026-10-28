// Service worker for push notifications (must stay in the same folder as index.html)
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
importScripts('firebase-config.js');
self.addEventListener('notificationclick', e => {
  const link = e.notification.data && e.notification.data.link;
  if (!link) return;                         // FCM's own notifications are handled by the SDK
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope)) { w.navigate(link); return w.focus(); }
    return clients.openWindow(link);
  }));
});
firebase.initializeApp(self.VIVI_FIREBASE_CONFIG);
firebase.messaging();
