
/**
 * Minimal Service Worker for PWA Installability
 */
const CACHE_NAME = 'gharelu-upay-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let the browser handle network requests normally
  return;
});
