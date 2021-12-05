import { renderRoute } from "./routes";
const anchors = document.querySelectorAll("a");
const app = document.getElementById("app");

function main() {
  let worker: Worker;
  /* DOM */
  document.addEventListener(
    "DOMContentLoaded",
    async (e) => {
      rewriteDom(e);
    },
    false
  );
  /* Worker */

  navigator.serviceWorker.addEventListener("message", (e) => {
    console.log("message", e.data);
  });

  if (typeof Worker !== "undefined") {
    if (typeof FileReader !== "undefined") {
      worker = new Worker(new URL("worker.ts", import.meta.url), {
        type: "module",
      });
      worker.onmessage = (e) => {
        const { data } = e;
        if (data.type === "log") {
          console.log(data.message);
        } else if (data.type === "error") {
          console.error(data.message);
        } else if (data.type === "render") {
          renderRoute(data.route);
        }
      };
      worker.postMessage({ type: "init" });
      worker.postMessage({ type: "log", message: "Worker initialized" });
      worker.addEventListener("error", (e) => {
        console.error(e.message);
      });
      worker.addEventListener("message", (e) => {
        console.log(e.data);
      });
    } else {
      console.error("FileReader is not supported");
    }
  } else {
    console.error("Web Worker is not supported");
  }

  /* Router */

  const rewriteDom = (e: Event) => {
    const route = window.location.pathname;
    const content = renderRoute(route);
    app!.innerHTML = content;
  };
  /* Window Events */
  window.onpopstate = () => {
    rewriteDom(new PopStateEvent("popstate"));
  };
  /* On Click  */
  const onNavClick = async (path: string | null) => {
    window.history.pushState({}, path!, window.location.origin + path);
    rewriteDom(new Event("DOMContentLoaded"));
  };
  anchors.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      let targetRef = e.currentTarget as HTMLElement;
      let path = targetRef.getAttribute("href");
      onNavClick(path);
    });
  });
}

main();
