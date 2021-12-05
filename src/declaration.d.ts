declare module "*.pug" {
  function templateFn(ctx?: any): string;
  export default templateFn;
}
declare module "*/pug.config.js" {
  const locals: any;
  export default locals;
}

declare module "*.static.pug" {
  const template: string;
  export default template;
}
