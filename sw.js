const cacheName="our-PWA"
const cachesFiles=[
    "/",
    "/index.html",
    "/js/main.js",
    "/styles/index.css",
    "/js/other.js",
    "/styles/other.css",
    "/other.html",

]
self.addEventListener("install",(event)=>{
    console.log("installed");
    self.skipWaiting()
    event.waitUntil(
        caches.open(cacheName).then(cache=>{
            cache.addAll(cachesFiles)
        })
    )
})
self.addEventListener("activate",()=>{
    console.log("activated");
    
})

self.addEventListener("fetch",(event)=>{
    console.log( "request send to:", event.request.url);
    event.respondWith(
        caches.match(event.request.url).then(res=> res || fetch(event.request.url))
        //or
    //     caches.match(event.request.url).then(res=>
    //         {
    //         if (res) {
    //             console.log("Found in cache");
    //             return res
    //         }
    //         else{
    //             console.log("Not Found in cache");
    //            return fetch(event.request.url)
    //         }
    //     }
    // )
        //or you can use async + await instead of .then() + .catch()
    )
})

