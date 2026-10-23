const CACHE_PREFIX = 'lifer-tools-pwa-';
const CACHE_NAME = `${CACHE_PREFIX}v9`;
const APP_FILES = [
    './index.html',
    './calculator.html',
    './docx.html',
    './password.html',
    './speedtest.html',
    './text_art.html',
    './tts.html',
    './style.css',
    './script.js',
    './theme.js',
    './tools-page.css',
    './pwa.js',
    './manifest.webmanifest',
    './icons/icon.svg',
    './icons/icon-192.png',
    './icons/icon-512.png'
];
const TOOL_PAGES = new Set([
    'calculator',
    'docx',
    'password',
    'speedtest',
    'text_art',
    'tts'
]);

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const requestUrl = new URL(request.url);

    if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const response = await fetch(request);
                if (response.ok) {
                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(request, response.clone());
                    return response;
                }
                if (response.status !== 404) return response;
            } catch (error) {
                console.info('Navigation is offline; serving the cached app page.', error);
            }

            const cache = await caches.open(CACHE_NAME);
            const cachedRequest = await cache.match(request);
            if (cachedRequest) return cachedRequest;

            const scopeUrl = new URL(self.registration.scope);
            const pageName = requestUrl.pathname.slice(scopeUrl.pathname.length).replace(/\/$/, '');
            if (TOOL_PAGES.has(pageName)) {
                const toolPage = await cache.match(new URL(`./${pageName}.html`, scopeUrl));
                if (toolPage) return toolPage;
            }

            const homePage = await cache.match(new URL('./index.html', scopeUrl));
            if (homePage) return homePage;
            return Response.error();
        })());
        return;
    }

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;

        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
    })());
});
