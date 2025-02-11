self.addEventListener("fetch", function(s) {
  s.respondWith(
    caches.open("cache").then(function(e) {
      return e.match(s.request).then(function(n) {
        console.log("cache request: " + s.request.url);
        var t = fetch(s.request).then(
          function(n) {
            return (
              console.log("fetch completed: " + s.request.url, n),
              n &&
                (console.debug("updated cached page: " + s.request.url, n),
                "GET" === s.request.method &&
                  "basic" === n.type &&
                  e.put(s.request, n.clone())),
              n
            );
          },
          function(s) {
            console.log("Error in fetch()", s),
              s.waitUntil(
                caches.open("cache").then(function(s) {
                  return s.addAll([
                    "/",
                    "/index.html",
                    "/index.html?homescreen=1",
                    "/?homescreen=1",
                    "/css/bootstrap.min.css",
                    "/css/ionicons.min.css",
                    "/css/magnific-popup.css",
                    "/css/owl.carousel.min.css",
                    "/css/responsive.css",
                    "/css/styles.css",
                    "/css/swiper.min.css",
                    "/images/assets/events/fba.png",
                    "/images/assets/events/fbw.png",
                    "/images/assets/events/rpj.png",
                    "/images/assets/diversity.png",
                    "/images/assets/logo2.png",
                    "/images/assets/team/avatar.png",
                    "/images/assets/technologies/android.png",
                    "/images/assets/technologies/cloud.png",
                    "/images/assets/technologies/mi.png",
                    "/images/assets/technologies/web.png",
                    "/images/icon.png",
                    "/js/custom.js",
                    "/js/vendors/bootstrap.bundle.min.js",
                    "/js/vendors/jquery.easing.min.js",
                    "/js/vendors/jquery.magnific-popup.min.js",
                    "/js/vendors/jquery.min.js",
                    "/js/vendors/owl.carousel.min.js",
                    "/js/vendors/swiper.min.js",
                    "/service-worker.js",
                    "/manifest.json"
                  ]);
                })
              );
          }
        );
        return n || t;
      });
    })
  );
}),
  self.addEventListener("install", function(s) {
    self.skipWaiting(), console.log("Latest version installed!");
  });

  
