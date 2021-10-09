const CACHE_STATIC_NAME = "static-v4";
const CACHE_DYNAMIC_NAME = "dynamic-v2";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME).then((cache) => {
            console.log("[Service Worker] Installing Service Worker ...");
            return cache.addAll([
                "/",
                "/src/js/app.js",
                "/index.html",
                "/help/index.html",
                "/src/js/feed.js",
                "/src/js/material.min.js",
                "/src/css/app.css",
                "/src/css/feed.css",
                "/src/css/help.css",
                "/src/images/main-image.jpg",
                "https://fonts.googleapis.com/css?family=Roboto:400,700",
                "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
                "https://fonts.googleapis.com/icon?family=Material+Icons",
            ]);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activating Service Worker ....");
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (
                        key !== CACHE_STATIC_NAME &&
                        key !== CACHE_DYNAMIC_NAME
                    ) {
                        console.log(
                            "[Service Worker] Removing old cache.",
                            key
                        );
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

//cache and return requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((respons) => {
            if (respons) {
                return respons;
            } else {
                return fetch(event.request)
                    .then((res) => {
                        return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                            cache.put(event.request.url, res.clone());
                            return res;
                        });
                    })
                    .catch((err) => {
                        console.log("message", err);
                    });
            }
        })
    );
});
