const CACHE_NAME = "omote-config-cache-v1";
const ASSETS_TO_CACHE = [
  "/omote-config/",
  "/omote-config/omote_home.html",
  "/omote-config/omote_device_manager.html",
  "/omote-config/omote_device_config.html",
  "/omote-config/omote_global_config.html",
  "/omote-config/omote_scene_manager.html",
  "/omote-config/remote_config.html",
  "/omote-config/icons/icon-48x48.html",
  "/omote-config/icons/icon-72x72.png",
  "/omote-config/icons/icon-96x96.png",
  "/omote-config/icons/icon-144x144.png",
  "/omote-config/icons/icon-192x192.png",
  "/omote-config/icons/icon-512x512.png"
];

// Install service worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch event: Serve cached assets when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate service worker and remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
