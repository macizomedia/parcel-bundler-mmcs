import renderHome from "./pages/home.pug";
import renderAbout from "./pages/about.pug";
import renderContact from "./pages/contact.pug";

import data from "./pug.config.js";

const routes = [
  { path: "/", component: (ctx: any): string => renderHome(ctx) },
  { path: "/about", component: (ctx?: any): string => renderAbout(ctx) },
  { path: "/contact", component: (ctx?: any): string => renderContact(ctx) },
];

export function renderRoute(path: string): string {
  let route = routes.find((r) => r.path === path);
  if (route) {
    return route.component({ data: data.locals } as any);
  }
  return "";
}

export default routes;
