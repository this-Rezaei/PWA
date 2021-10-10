
let CACHE_NAME = 'codePwa';

var urlCache = [
        '/static/js/bundle.js',
        '/static/js/vendors~main.chunk.js',
        '/static/js/main.chunk.js',
        '/manifest.json',
        '/logo192.png',
        '/',
        '/static/media/logo.6ce24c58.svg',
        '/home',
        'article'

]


/// install service worker 
this.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            return cache.addAll(urlCache)
        })
    )
})

// fetch cache data

this.addEventListener('fetch',(event)=>{
    if(!navigator.onLine){
        console.log("offline")
        event.respondWith(
            caches.match(event.request)
            .then((response)=>{
                if(response){
                    return response
                }              
                let fUrl = event.request.clone()
                fetch(fUrl)
            })
        )
    }
})