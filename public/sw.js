// Minimal Service Worker for PWA installability
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A fetch handler is required for the PWA install prompt to be shown
  event.respondWith(fetch(event.request).catch(() => {
    // Fallback logic if needed
  }));
});