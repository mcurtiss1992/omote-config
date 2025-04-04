const CACHE_NAME = "omote-config-cache-localhost-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/omote_device_manager.html",
  "/omote_device_config.html",
  "/omote_global_config.html",
  "/omote_scene_manager.html",
  "/omote_gui_manager.html",
  "/omote_gui_config.html",
  "/omote_json_direct_edit.html",
  "/omote_json_list.html",
  "/remote_config.html",
  "/omote_home.html",
  "/icons/icon-48x48.png",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-144x144.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/favicon.ico"
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
    caches.match(event.request, {ignoreSearch: true}).then((response) => {
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
