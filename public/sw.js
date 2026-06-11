
// Minimal Service Worker to satisfy Chrome PWA installability requirements
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Basic fetch listener required for PWA install criteria
  event.respondWith(fetch(event.request).catch(() => {
    return caches.match(event.request);
  }));
});
