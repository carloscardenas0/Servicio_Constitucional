//asignar uun nombre y version al cache
const CACHE_NAME = 'v1_cache_tareas',
    urlsToCache = [
        './',
        './index.css',
        './img/lista_de_tareas_192.jpeg',
        './img/lista_de_tareas_512.jpeg',
        './index.js',
        './service.js',
        './sw.js',
        './manifest.json',
        './index.html',

    ]

//durante la fase de instalacion, generalmente se almacena en cache los activos estaticos
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Falló registro de cache', err))
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            })
            // Le indica al SW activar el cache actual
            .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    //recuperar del cache
                    return res
                }
                //recuperar de la petición a la url
                return fetch(e.request)
            })
    )
})