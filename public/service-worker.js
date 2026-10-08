const CACHE_NAME = 'median-cache-v6';
const CORE_ASSETS = [
  '/',
  '/privacy',
  '/year-2027', '/year-2026', '/year-2025', '/year-2024', '/year-2023', '/year-2022',
  '/year-2021', '/year-2020', '/year-2019', '/year-2018', '/year-2017',
  '/history',
  '/household-1', '/household-2', '/household-3', '/household-4', '/household-5', '/household-6',
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

function putInCache(request, response) {
  if (response && response.status === 200 && response.type === 'basic') {
    var clone = response.clone();
    caches.open(CACHE_NAME).then(function (cache) { cache.put(request, clone); });
  }
  return response;
}

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  if (url.origin !== location.origin) return; // 외부 CDN은 브라우저 기본 동작에 맡김

  var accept = event.request.headers.get('accept') || '';
  var isPage = event.request.mode === 'navigate' || accept.indexOf('text/html') !== -1;

  if (isPage) {
    // 페이지(HTML)는 항상 최신 배포본을 먼저 받고, 오프라인일 때만 캐시 사용
    event.respondWith(
      fetch(event.request)
        .then(function (res) { return putInCache(event.request, res); })
        .catch(function () {
          return caches.match(event.request).then(function (cached) {
            return cached || caches.match('/');
          });
        })
    );
    return;
  }

  // CSS·이미지 등은 캐시를 먼저 보여주고 뒤에서 갱신
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fetchPromise = fetch(event.request)
        .then(function (res) { return putInCache(event.request, res); })
        .catch(function () { return cached; });
      return cached || fetchPromise;
    })
  );
});
