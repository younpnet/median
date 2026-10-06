// service-worker.js v4 (2026-10-06) — median.younp.net
// 핵심 페이지를 캐싱해서 오프라인/저속 회선에서도 열리게 하고, 백그라운드로 최신 버전을 갱신합니다.

const CACHE_NAME = 'median-cache-v4';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/privacy.html',
  '/year-2027.html',
  '/year-2026.html',
  '/year-2025.html',
  '/year-2024.html',
  '/year-2023.html',
  '/year-2022.html',
  '/year-2021.html',
  '/year-2020.html',
  '/year-2019.html',
  '/year-2018.html',
  '/year-2017.html',
  '/history.html',
  '/household-1.html',
  '/household-2.html',
  '/household-3.html',
  '/household-4.html',
  '/household-5.html',
  '/household-6.html',
  '/tailwind.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(CORE_ASSETS); })
      .catch(function () { /* 일부 자산 캐싱 실패해도 설치 자체는 진행 */ })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
          .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  if (url.origin !== location.origin) return; // 외부 CDN(폰트/아이콘 등)은 브라우저 기본 동작에 맡김

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fetchPromise = fetch(event.request)
        .then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            var clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
          }
          return networkResponse;
        })
        .catch(function () { return cached; });
      return cached || fetchPromise;
    })
  );
});
