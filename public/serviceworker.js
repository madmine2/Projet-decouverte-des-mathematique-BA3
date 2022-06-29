const FILES_TO_CACHE = ['offline.html','index.html'];
var CACHE_STATIC_NAME = 'static-v3';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
var STATIC_FILES = [
  '/',
  'index.html',
  'offline.html',
  'src/js/app.js',
  'src/js/feed.js',
  'src/js/idb.js',
  'src/js/promise.js',
  'src/js/fetch.js',
  'src/js/material.min.js',
  'src/css/app.css',
  'src/css/feed.css',
  'src/images',
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"

];
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(						       // Promise
      caches.open(CACHE_STATIC_NAME)				      // Ouverture du cache storage
        .then(function (cache) {
          console.log('[Service Worker] Precaching App Shell');
          cache.addAll(STATIC_FILES);				      // Ajout de tous les éléments du tableau en cache
        })  
    )
  });
  
  self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
      caches.keys()					// On récupère les différents caches présents dans le cache storage
        .then(function (keyList) {
          return Promise.all(keyList.map(function (key) {	// On fait une promesse pour ne pas arrêter le traitement
            if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {	  // après avoir récupéré la liste
              console.log('[Service Worker] Removing old cache.', key);
              return caches.delete(key);		// On supprime les caches obsolètes
            }
          }));
        })
    );
    return self.clients.claim();
  });
  
  
  
  self.addEventListener('fetch', function(event) {
     event.respondWith(
        caches.match(event.request)		// On vérifie que la valeur correspondante à la requête existe
           .then(function(response) {
              if (response) {
                 return response;			// La valeur existe dans le cache, on la retourne
              } else {
                 return fetch(event.request)		// On effectue la requête réseau
                    .then(function(res) {			// On renvoie le résultat de la requête
                       return caches.open(CACHE_DYNAMIC_NAME)	// On ouvre le cache dynamique
                          .then(function(cache) {
                             cache.put(event.request.url, res.clone());	// On met l’url et le clone de la réponse
                             return res;
                          })
                   })
                   .catch (function(err) {					// On capture les erreurs
             return caches.open(CACHE_STATIC_NAME)		// On ouvre le cache statique
                          .then(function(cache) {
                          if (event.request.headers.get('accept').includes('text/html')) {  // On vérifie qu’il s’agit d’une page html
                             return cache.match('offline.html');		// On retourne la page d’erreur
                          }
                       });
                 });           
              }
          })
     );
  });
  /*
// INSTALL
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();  
});

// FETCH
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch( () => {
            return caches.match("./index.html");
        })
    );
});
self.addEventListener('fetch', event => {
    if (event.request.url.includes("https://media.istockphoto.com/photos/computer-error-picture-id1222806141?k=20&m=1222806141&s=612x612&w=0&h=GoODCHnR0mSefDBLWJpnqVnfRKH9ttdYPO0-KEYbb7w=")) {
        event.respondWith(fetch("https://media.istockphoto.com/photos/computer-error-picture-id1222806141?k=20&m=1222806141&s=612x612&w=0&h=GoODCHnR0mSefDBLWJpnqVnfRKH9ttdYPO0-KEYbb7w="));
    }
});
*/