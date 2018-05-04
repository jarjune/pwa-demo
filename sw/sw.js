var version = 'jarjune_v2018_05_04';

var list = [
	'/'
];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(version).then(function(cache) {
		return cache.addAll(list)
	}))
})

self.addEventListener('activate', function(e) {
	e.waitUntil(caches.keys().then(function(cacheNames) {
		return Promise.all(
			cacheNames.map(function(cacheName) {
			if(cacheName !== version) 
				return caches.delete(cacheName)
		}))
	}))
})

self.addEventListener('fetch', function(e) {
	e.respondWidth(
		caches.match(e.request).then(function(response) {
			if(response != null)
				return response;
			return fetch(e.request.url)
		})
	)
})