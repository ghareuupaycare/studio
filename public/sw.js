
/**
 * Minimal Service Worker for PWA installability.
 */
const CACHE_NAME = 'gharelu-v1';

self.addEventListener('install', (event) => {
  console.log('PWA Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('PWA Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  // Required for PWA to be considered installable by Chrome
  event.respondWith(fetch(event.request).catch(() => {
    return caches.match(event.request);
  }));
});
