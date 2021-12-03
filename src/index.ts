import "./router";
import renderPage from "./home.pug";
const app = document.getElementById("app");

(function Home() {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      init();
    },
    false
  );
  const init = async () => {
    if (app) {
      app.innerHTML = renderPage({
        hero: "Zen and the Art of Computer Programming",
      });
      new Worker(new URL("worker.js", import.meta.url), { type: "module" });
    }
  };
})();
