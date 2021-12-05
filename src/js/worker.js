import { manifest, version } from "@parcel/service-worker";

async function install() {
  const cache = await caches.open(version);
  await cache.addAll(manifest);
}
self.addEventListener("install", (e) => e.waitUntil(install()));
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("zen-statics").then(function (cache) {
      return cache.addAll([
        "/app.js",
        "index.html",
        // etc.
      ]);
    })
  );
});

async function activate() {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => key !== version && caches.delete(key)));
}
self.addEventListener("activate", (e) => e.waitUntil(activate()));
self.addEventListener("fetch", function (event) {
  event.respondWith(
    // Try the cache
    caches
      .match(event.request)
      .then(function (response) {
        // Fall back to network
        return response || fetch(event.request);
      })
      .catch(function () {
        // If both fail, show a generic fallback:
        return caches.match("/offline.html");
        // However, in reality you'd have many different
        // fallbacks, depending on URL and headers.
        // Eg, a fallback silhouette image for avatars.
      })
  );
});

self.postMessage({ type: "ready" });
self.onmessage = (e) => {
  console.log("Message from WEBWORKER:", e.data);
};
