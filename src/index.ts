import renderHome from "./home.pug";
import renderAbout from "./about.pug";
import renderContact from "./contact.pug";
const app = document.getElementById("app");
const anchors = document.querySelectorAll("a");

let home: string;
let about: string;
let contact: string;
let routes: any;

const loadAll = async () => {
  home = renderHome({ hero: "zen Home" });
  about = renderAbout({ hero: "zen Home" });
  contact = renderContact({ hero: "zen Home" });
};
const main = () => {
  document.addEventListener(
    "DOMContentLoaded",
    async () => {
      await loadAll();
      app!.innerHTML = home;
      routes = {
        "/": home,
        "/about": about,
        "/contact": contact,
      };
    },
    false
  );
  window.onpopstate = () => {
    app!.innerHTML = routes[window.location.pathname];
  };
  const onNavClick = async (path: string | null) => {
    console.log(path);
    window.history.pushState({}, path!, window.location.origin + path);
    path ? (app!.innerHTML = routes[path]) : null;
  };
  anchors.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      let targetRef = e.currentTarget as HTMLElement;
      let path = targetRef.getAttribute("href");
      onNavClick(path);
    });
  });
};

main();
