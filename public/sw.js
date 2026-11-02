const CACHE_NAME = 'lumina-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
  '/icon.svg'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Network first: prova sempre la rete, usa la cache solo offline
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.status === 200 && e.request.method === 'GET' && !e.request.url.includes('/api/')) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
