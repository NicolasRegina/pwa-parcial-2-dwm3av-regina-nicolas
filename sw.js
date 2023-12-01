// Asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_pwa_regina_nicolas';

// Ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './css/style.css',
    './icon.png',
    './img/icon/icon-192x192.png',
    './img/icon/icon-256x256.png',
    './img/icon/icon-384x384.png',
    './img/icon/icon-512x512.png',
    './img/juegos/kirby.png',
    './img/juegos/mario-1.png',
    './img/juegos/mario-2.png',
    './img/juegos/metroid.png',
    './img/juegos/pokemon.png',
    './img/juegos/smash.png',
    './img/juegos/splatoon.png',
    './img/juegos/xenoblade.png',
    './img/juegos/zelda-1.png',
    './img/juegos/zelda-2.png',
    './img/ajustable.png',
    './img/angulo.png',
    './img/fondo-mario.jpg',
    './img/foto-switch.png',
    './img/hardware-software.png',
    './img/icon-white.png',
    './img/joy-con-01.png',
    './img/joy-con-02.png',
    './img/joy-con-03.png',
    './img/joycon-large.png',
    './img/LAN.jpg',
    './img/linkedin.png',
    './img/mail.png',
    './img/mario_and_friends.png',
    './img/mode-1.png',
    './img/mode-2.png',
    './img/mode-3.png',
    './img/multiplayer-lifestyle-lite-2.png',
    './img/nicolas_low.jpg',
    './img/oled-1.png',
    './img/pantalla.png',
    './img/sound.png',
    './img/switch_banner_cuadrado.jpg',
    './img/switch_banner.jpg'
];

// Evento install
// Instalación del service worker y guardar en cache los recursos estáticos
self.addEventListener('install', e => { 
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    );
});

// Evento activate
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    //el evento espera a que se realice la lógica
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            // Borrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // Activar cache
                //self es el service worker
                self.clients.claim();
            })
    );
});

// Evento fetch
self.addEventListener('fetch', e => {
    //responde con datos que estén en la cache o datos que estén en el servidor
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //si da true devuelve datos desde cache
                    return res;
                }
                return fetch(e.request);
            })
    );
});