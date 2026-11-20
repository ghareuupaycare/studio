
/**
 * PWA Service Worker for Gharelu Upay Care.
 * Satisfies installability criteria for modern browsers.
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through fetch handler
});
