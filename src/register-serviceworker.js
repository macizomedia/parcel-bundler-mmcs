(function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(new URL("js/sw.js", import.meta.url), {
        type: "module",
      })
      .then((response) => {
        console.log("Service Worker registered.");
      })
      .catch((error) => {
        console.error(error);
      });
  }
})();
