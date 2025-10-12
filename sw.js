const paths=[
    "/",
    "/index.html",
    "/js/main.js",
    "/js/other.js",
    "/styles/index.css",
    "/styles/other.css",
    "/other.html"    
]

self.addEventListener("install",(event)=>{
    console.log("installed");
    self.skipWaiting()
    event.waitUntil(
        caches.open("our-site").then((cache)=>{
           return cache.addAll(paths)
        })
    )
})
self.addEventListener("activate",()=>{
    console.log("activated !!!!!!");
    
})

self.addEventListener("fetch",(event)=>{
    console.log("sending request to",event.request.url);
    event.respondWith( 
        caches.match(event.request.url).then((file)=>{
            if(file){
                console.log("file found in cache");
                return file
            }
            else{
                console.log("file NOT found in cache");
                return fetch(event.request.url)
            }
        })
        //or 
        // caches.match(event.request.url).then((file)=> file || fetch(event.request.url))
        //or you can use async + await instead of .then() + .catch()
    )
})